// 生成随机数
function generate_random_number() {
    const digits = [];
    while (digits.length < 4) {
        const digit = Math.floor(Math.random() * 9) + 1;
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return digits.join('');
}

// 全局变量，保存随机数和尝试次数
let secret_number = generate_random_number();
let attempts = 0;

// 验证输入是否合法（输入是否是四位数字且没有重复数字，且不包含 0）
function validate_guess(guess) {
    // 
    return /^\d{4}$/.test(guess) && new Set(guess).size === 4 && !guess.includes('0');
}
// 计算结果
function calculate_result(secret, guess) {
    let a_count = 0, b_count = 0;
    for (let i = 0; i < 4; i++) {
        if (guess[i] === secret[i]) {
            a_count++;
        } else if (secret.includes(guess[i])) {
            b_count++;
        }
    }
    return `${a_count}A${b_count}B`;
}

// 回车键提交猜测，代替按钮点击
function check_enter(event) {
    if (event.key === "Enter") {
        make_guess();
    }
}

// 页面控制
function make_guess() {
    const guess_input = document.getElementById('guess_input');
    const feedback = document.getElementById('attempts_display');
    const guess_log = document.getElementById('guess_log');
    const submit_button = document.querySelector('button');
    const result_section = document.querySelector('.result');
    const guess = guess_input.value.trim();
    // 如果是第一次输入，无论正确与否，都显示尝试次数区域
    if (attempts === 0) {
        result_section.style.visibility = 'visible';
    }
    // 验证输入是否合法
    if (!validate_guess(guess)) {
        // 显示错误提示信息
        feedback.textContent = "不合规则的输入，请输入1到9之间的四位不重复数字。";
        feedback.style.color = "red"; 
        guess_input.value = ''; 
        guess_input.focus();    
        return;
    }
    // 恢复反馈颜色为默认
    feedback.style.color = "black";
    // 增加尝试次数
    attempts++;
    const result = calculate_result(secret_number, guess);
    // 更新反馈信息
    feedback.textContent = `你已经猜了 ${attempts} 次。`;
    // 添加记录到日志
    const log_entry = document.createElement('p');
    log_entry.textContent = `第 ${attempts} 次猜测：${guess}   结果是： ${result}`;
    guess_log.appendChild(log_entry);
    // 游戏结果判断
    if (result === "4A0B") {
        feedback.textContent = `恭喜你！你猜对了！答案是 ${secret_number}`;
        end_game(submit_button);
    } else if (attempts >= 10) {
        feedback.textContent = `很遗憾，你没能猜出来。正确答案是 ${secret_number}`;
        end_game(submit_button);
    }
    // 清空输入框并聚焦
    guess_input.value = '';
    guess_input.focus();
}
// 结束游戏
function end_game(button) {
    const guess_input = document.getElementById('guess_input');
    guess_input.disabled = true;
    // 修改按钮的文本和功能
    button.textContent = "重新开始";
    button.onclick = restart_game;
}
// 重新开始游戏
function restart_game() {
    // 重新生成随机数
    secret_number = generate_random_number();
    attempts = 0;
    // 重置元素
    const feedback = document.getElementById('attempts_display');
    const guess_input = document.getElementById('guess_input');
    const guess_log = document.getElementById('guess_log');
    const submit_button = document.querySelector('button');
    const result_section = document.querySelector('.result');

    feedback.textContent = '你已经猜了 0 次。';
    result_section.style.visibility = 'hidden'; 
    guess_log.innerHTML = '<p><strong>猜测记录</strong></p>'; 
    // 重置输入框
    guess_input.value = '';
    guess_input.disabled = false;
    guess_input.focus();
    // 恢复按钮的文本和功能
    submit_button.textContent = "提交猜测";
    submit_button.onclick = make_guess;
}
