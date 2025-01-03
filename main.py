import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import re
from flask import Flask, request, jsonify
from flask_cors import CORS

# 登录信息
# username = "22yxchen72"
# password = "xp688534"
app = Flask(__name__)
CORS(app)  # 启用 CORS


# 定义登录教务系统并获取课程信息的函数
def login_to_jw_system(username, password):
    # 登录界面的网址
    login_url = "https://sso.stu.edu.cn/login?service=http%3A%2F%2Fjw.stu.edu.cn%2F"

    # 配置Selenium使用的浏览器选项,这里关闭了GPU加速和沙盒模式,可以改为无头模式进行后台操作
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # 无头模式（不弹出浏览器）
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")

    # 获取 WebDriver
    # 使用webdriver_manager自动安装并配置 Chrome 浏览器的驱动程序
    driver_path = ChromeDriverManager().install()
    # 将驱动路径作为服务传递给selenium的webdriver
    service = Service(driver_path)

    # 使用requests获取登录会话,这个会话会保持连接池和会话状态
    session = requests.Session()

    # 使用GET请求访问登录页面
    response = session.get(login_url)
    # 解析登录页面的内容
    soup = BeautifulSoup(response.text, "html.parser")

    # 提取隐藏字段 lt、execution、_eventId
    lt = soup.find('input', {'name': 'lt'})['value']
    execution = soup.find('input', {'name': 'execution'})['value']
    _eventId = soup.find('input', {'name': '_eventId'})['value']

    # 更新登录payload
    login_payload = {
        'username': username,
        'password': password,
        'lt': lt,
        'execution': execution,
        '_eventId': _eventId
    }

    # 设置HTTP请求头,特别是 User-Agent,这个头部字段模拟浏览器类型，防止请求被判定为机器人的请求
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }

    #  发送 POST 请求来提交登录表单数据
    login_response = session.post(login_url, data=login_payload, headers=headers)

    # 获取登录后的Cookies，用于Selenium的会话
    cookies = session.cookies.get_dict()

    # 初始化Selenium并启动浏览器
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # 打开教务系统页面
    driver.get("http://jw.stu.edu.cn/")

    # 设置Cookies到Selenium中，模拟已登录状态
    for cookie_name, cookie_value in cookies.items():
        driver.add_cookie({
            'name': cookie_name,
            'value': cookie_value,
            'domain': '.stu.edu.cn',  # 请确保这个域名是正确的
        })

    # 刷新页面以便Selenium应用Cookie
    driver.refresh()

    # 等待页面加载
    time.sleep(5)

    # 获取页面源代码并解析
    page_source = driver.page_source  # 获取完整页面内容
    # 将页面内容解析为HTML
    soup = BeautifulSoup(page_source, "html.parser")

    # 打印页面源码以检查课程信息的位置
    # print(soup.prettify())  # 可以注释掉这行，只是检查页面内容

    # 第一步:在10秒找到教务系统页面中 span中的培养管理并点击它
    培养管理_menu = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//span[text()='培养管理']"))
    )
    培养管理_menu.click()

    # 第二步：在10秒找到教务系统页面中 span中的我的课表并点击它
    我的课表_menu = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//span[text()='我的课表']"))
    )

    # 第三步：点击“我的课表”菜单
    我的课表_menu.click()

    # 等待页面加载或AJAX请求完成，直到新的元素加载出来
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "ul.submenu"))
    )

    # 稍等一下，确保 AJAX 请求完成，页面完全加载
    time.sleep(3)

    # 第四步：点击“学期理论课表”菜单
    学期理论课表_menu = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "NEW_XSD_PYGL_WDKB_XQLLKB"))
    )
    学期理论课表_menu.click()

    # 等待新页面加载完成
    # js = "return jQuery.active == 0"  # jQuery.active 0表示没有正在进行的AJAX请求
    # WebDriverWait(driver, 20).until(
    #     lambda driver: driver.execute_script(js)
    # )

    # 等待 iframe 加载并获取到 iframe 元素,这个iframe是装ajax课表的页面
    iframe = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "FrameNEW_XSD_PYGL_WDKB_XQLLKB"))
    )

    # 切换到 iframe
    driver.switch_to.frame(iframe)

    # 等待 iframe 内部页面加载完成,以Body作为加载条件
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'body'))  # 根据页面的实际元素进行调整
    )

    # # 或者，如果想获取整个页面的 HTML 内容
    # html_content = driver.page_source
    # print(html_content)

    # 获取所有类名为 'kbcontent' 的 div 元素
    kbcontent_divs = driver.find_elements(By.CLASS_NAME, "kbcontent")

    # 过滤出 style 不为 'display:none' 的 div 元素
    visible_kbcontent_divs = []
    for div in kbcontent_divs:
        # 使用 JavaScript 获取 div 的计算样式
        display_style = driver.execute_script(
            "return window.getComputedStyle(arguments[0]).getPropertyValue('display');", div)

        # 判断是否为 'none',不为none,则写入visible_kbcontent_divs中
        if display_style != 'none':
            visible_kbcontent_divs.append(div)

    # 设置一个匹配周和节的正则表达式
    pattern = r"([0-9\-\,]+\(周\))(\[[0-9\-]+节\])"

    # 生成一个显示具体时间的函数
    def detailTime(str):
        match str:
            case ['01-02']:
                return '08:00-09:40'
            case ['03-04']:
                return '10:00-11:40'
            case ['03-04-05']:
                return '10:00-12:35'
            case ['06-07']:
                return '14:00-15:40'
            case ['08-09']:
                return '16:00-17:40'
            case ['08-09-10']:
                return '16:00-18:35'
            case ['11-12']:
                return '19:20-21:00'
            case ['11-12-13']:
                return '19:20-21:55'

    # 创建一个存储最终数据的列表
    courseData = []
    # 创建一个存储基本课程数据的列表,像缓冲区
    baseData = []
    # 循环遍历所有的div
    for div in visible_kbcontent_divs:

        # 获取font标签
        fonts = div.find_elements(By.TAG_NAME, "font")
        # 因为visible_kbcontent_divs中有div是没有font元素的,针对没有font元素的值,我们认定为没课
        if (len(fonts) == 0):
            # print('没课.')
            continue
        # 有font元素的值,我们就需要提取当前font所在的div的id值作为星期号,并打印font值
        else:
            # print(div.get_attribute('id'))
            # 使用-分割id,可以将id分成三个部分,第二个部分就是要的星期号
            div_id = div.get_attribute('id')
            day = div_id.split('-')
            # print(day[1])
            for font in fonts:
                match1 = re.match(pattern, font.text)
                if match1:
                    # 获取多少周
                    week = match1.group(1)
                    # print(match1.group(1))
                    # 获取多少节
                    # print(match1.group(2))
                    period_time = match1.group(2)
                    # 将多少节再次分割 获取['03-04-05']
                    period_numbers1 = re.findall(r'\d{2}(?:-\d{2})*', period_time[1:-1])
                    # 通过['03-04-05']获取详细时间
                # print(detailTime(period_numbers1))
                else:
                    if (font.text == ''):
                        continue
                    else:
                        baseData.append(font.text)

                    # print(font.text)

            # 处理数据 将数据写入course
            course = {
                'id': len(courseData) + 1,
                'day': day[1],
                'name': baseData[0],
                'teacher': baseData[1],
                'week': week,
                'time': period_time,
                'detailsTime': detailTime(period_numbers1),
                'location': baseData[2]
            }
            courseData.append(course)
            # basedata是存储没一节课font的一个缓冲区
            baseData.clear()

    # for course in courseData:
    #     print(course)

        # 打印 font 元素的文本内容
    # # 如果需要切换回主页面
    driver.switch_to.default_content()

    # 关闭浏览器
    driver.quit()
    return courseData


@app.route('/login', methods=['POST'])
def login():
    # 获取来自请求的 JSON 数据
    data = request.get_json()
    # 提取用户名和密码
    username = data.get('username')
    password = data.get('password')

    # 调试：打印接收到的用户名和密码
    print(f"Received username: {username}, password: {password}")

    # 调用登录并获取课程数据

    course_data = login_to_jw_system(username, password)
    return jsonify({'course_data': course_data}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)