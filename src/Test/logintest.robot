*** Settings ***
Library    SeleniumLibrary
Library    Collections

*** Variables ***
${BASE_URL}            http://localhost:3000/home-login-register
${VALID_USERNAME}      6vLpK@example.com
${VALID_PASSWORD}      123
${INVALID_USERNAME}    siratee2@example.com
${INVALID_PASSWORD}    123

*** Test Cases ***
NOPassLogin
    Invalid Login
Register ID
    Register
    Setting-Profile
    Upload Photo
    Logout
PassLogin
    Valid Login
    Delete Account
*** Keywords ***

Valid Login
    [Tags]    Login    Positive
    Open Browser    ${BASE_URL}    edge
    Set Window Size    width=300    height=1000
    Click Element   //*[@id="root"]/div/div[2]/button[1]
    Input Text      //*[@id="root"]/div/div[1]/form/div[2]/input[1]    ${VALID_USERNAME}
    Input Text      //*[@id="root"]/div/div[1]/form/div[2]/input[2]    ${VALID_PASSWORD}
    Capture Page Screenshot     login/login-test-1.png
    Click Button    //*[@id="root"]/div/div[1]/form/button
    Sleep    3s
    Capture Page Screenshot     login/login-sucess-test.png
    Reload Page
    Sleep    2s

Invalid Login
    [Tags]    Login    Negative
    Open Browser    ${BASE_URL}    edge
    Set Window Size    width=340    height=1000
    Click Element   //*[@id="root"]/div/div[2]/button[1]
    Input Text      //*[@id="root"]/div/div[1]/form/div[2]/input[1]    ${INVALID_USERNAME}
    Input Text      //*[@id="root"]/div/div[1]/form/div[2]/input[2]    ${INVALID_PASSWORD}
    Capture Page Screenshot     login/login-test-2.png
    Click Button    //*[@id="root"]/div/div[1]/form/button
    Sleep    3s
    Capture Page Screenshot     login/login-fail-test.png
    close browser

Register
    Open Browser    ${BASE_URL}    edge
    Set Window Size    width=300    height=1000
    Click Element   //*[@id="root"]/div/div[2]/button[2]
    Sleep    2s
    Input Text      //*[@id="username"]                Pear
    Input Text      //*[@id="email"]                   6vLpK@example.com
    Input Text      //*[@id="password"]                123
    Input Text      //*[@id="confirmPassword"]         123
    Capture Page Screenshot     register/register-test.png
    Click Button    //*[@id="root"]/div/div[1]/form/button
    Sleep    2s
    Capture Page Screenshot     register/register-test-success.png
    Reload Page
    Sleep    2s
    Click Element   //*[@id="root"]/div/div[2]/button
    Sleep    2s
    Capture Page Screenshot     register/register-test-setting.png
    Click Element   //*[@id="root"]/div/div/div[4]/button

Setting-Profile
    Input Text      //*[@id="root"]/div/div[2]/div[1]/div/input                   PEARPLOY
    Input Text      //*[@id="root"]/div/div[2]/div[2]/div/input                   21/01/2003
    Capture Page Screenshot     setting/setting-test.png
    Click Element   //*[@id="root"]/div/div[3]/div/div[2]/button
    Click Element   //*[@id="root"]/div/div[4]/div/div[3]/button
    Input Text      //*[@id="root"]/div/div[5]/div/input                          KMUTT   
    Click Element   //*[@id="root"]/div/div[6]/div/div[1]/button[1]
    Click Element   //*[@id="root"]/div/div[6]/div/div[1]/button[2]
    Click Button    //*[@id="root"]/div/button
    Sleep    2s
    Capture Page Screenshot     setting/setting-test-success.png

Upload Photo
    Sleep    2s
    Click Element   //*[@id="root"]/div/div/div[2]/div[1]/label
    # Execute JavaScript    alert('Please upload a photo!')
    Sleep    10s
    # Press Keys    None    Enter
    Click Element   //*[@id="root"]/div/div/div[2]/div[2]/label
    Sleep    10s
    Capture Page Screenshot     upload/upload-test.png
    Click Element  //*[@id="root"]/div/div/div[3]/button
    Sleep    2s
    Run Keyword And Ignore Error    Press Keys    None    Enter

Logout
    Sleep    2s
    Click Element   //*[@id="root"]/div/div[1]/div[4]/button[2]
    Capture Page Screenshot     logout/logout-test.png
    Sleep    2s
    Click Element   //*[@id="root"]/div/div[2]/div[7]/button
    Capture Page Screenshot     logout/logout-test-success.png
    close browser

Delete Account
    Sleep    2s
    Click Element   //*[@id="root"]/div/div[1]/div[4]/button[2]
    Sleep    2s
    Click Element   //*[@id="root"]/div/div[3]/div[3]/button
    Capture Page Screenshot     delete/delete-test.png
    Sleep    2s
    Click Element    xpath=//button[@type='button' and contains(@class, 'swal2-confirm') and contains(text(), 'Delete My Account')]
    Sleep    2s
    Capture Page Screenshot     delete/delete-test-success.png
    close browser
