// 输入框特效和数字计数
function addInputEffects() {
    const input = document.getElementById('barcodeInput');
    const digitCounter = document.getElementById('digitCounter');
    const digitStatus = document.getElementById('digitStatus');
    const generateBtn = document.querySelector('button[onclick="generateBarcode()"]');
      // 格式化输入值（保留空格，不限制数字长度）
    function formatInput(value) {
        // 移除所有非数字和非空格字符
        return value.replace(/[^\d\s]/g, '');
    }
      // 更新数字计数和状态
    function updateDigitCount() {
        const digitsOnly = input.value.replace(/\D/g, ''); // 只保留数字
        const count = digitsOnly.length;
        
        // 更新计数显示
        digitCounter.textContent = `${count}位数字`;
        
        // 更新状态和按钮
        if (count === 0) {
            digitStatus.textContent = '请输入数字';
            digitStatus.className = 'text-sm text-gray-500';
            generateBtn.disabled = true;
            generateBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            digitStatus.textContent = '可以生成条形码';
            digitStatus.className = 'text-sm text-green-500';
            generateBtn.disabled = false;
            generateBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }
    
    // 处理输入事件
    function handleInput() {
        const cursorPosition = input.selectionStart;
        const originalValue = input.value;
        const formattedValue = formatInput(originalValue);
        
        if (originalValue !== formattedValue) {
            input.value = formattedValue;
            // 尝试保持光标位置
            const newPosition = Math.min(cursorPosition, formattedValue.length);
            input.setSelectionRange(newPosition, newPosition);
        }
        
        updateDigitCount();
    }
    
    // 输入时的特效和计数更新
    let typingTimer;
    input.addEventListener('input', function() {
        this.classList.add('input-typing');
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            this.classList.remove('input-typing');
        }, 1000);
        
        // 处理输入和更新计数
        handleInput();
    });
    
    // 处理粘贴事件
    input.addEventListener('paste', function(e) {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        const formattedText = formatInput(pastedText);
        
        // 插入格式化后的文本
        const start = this.selectionStart;
        const end = this.selectionEnd;
        const currentValue = this.value;
        const newValue = currentValue.substring(0, start) + formattedText + currentValue.substring(end);
        
        this.value = formatInput(newValue);
        
        // 设置光标位置
        const newPosition = start + formattedText.length;
        this.setSelectionRange(newPosition, newPosition);
        
        // 触发输入事件以更新计数
        handleInput();
        
        // 显示粘贴提示
        const digitsOnly = formattedText.replace(/\D/g, '');
        if (digitsOnly.length > 0) {
            showToast(`已粘贴${digitsOnly.length}位数字`, 'info');
        }
    });
    
    // 焦点特效
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('pulse-effect');
        setTimeout(() => {
            this.parentElement.classList.remove('pulse-effect');
        }, 300);
    });
    
    // 初始化计数显示
    updateDigitCount();
}

// 添加震动特效（用于错误提示）
function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// 震动动画（需要添加到CSS中）
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// 应用脉冲加载效果
function applyLoadingEffect(element) {
    element.classList.add('loading-pulse');
}

// 移除加载效果
function removeLoadingEffect(element) {
    element.classList.remove('loading-pulse');
}

// 显示提示信息（替代alert）
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast-effect';
    
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
            break;
        case 'error':
            backgroundColor = 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)';
            break;
        case 'warning':
            backgroundColor = 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)';
            break;
        default:
            backgroundColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    toast.style.background = backgroundColor;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 3秒后移除
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// 动态添加震动CSS
function addShakeCSS() {
    const style = document.createElement('style');
    style.textContent = shakeCSS;
    document.head.appendChild(style);
}

// 点击特效函数
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    // 移除波纹元素
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 添加点击特效到所有按钮
function addClickEffectsToButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.classList.contains('click-effect')) {
            button.classList.add('click-effect');
            button.addEventListener('click', function(e) {
                createRippleEffect(e, this);
                // 添加脉冲效果
                this.classList.add('pulse-effect');
                setTimeout(() => {
                    this.classList.remove('pulse-effect');
                }, 300);
            });
        }
    });
}

// 成功特效（只用于按钮）
function showSuccessEffect(element) {
    element.classList.add('success-flash');
    setTimeout(() => {
        element.classList.remove('success-flash');
    }, 500);
}

// 历史记录相关函数
function saveToHistory(input, barcodeColor = '#000000', backgroundColor = '#ffffff') {
    let history = JSON.parse(localStorage.getItem('barcodeHistory') || '[]');
    const timestamp = new Date().toLocaleString();
    
    // 检查是否已存在相同的记录
    const existingIndex = history.findIndex(item => item.input === input);
    if (existingIndex !== -1) {
        // 如果存在，更新时间戳和颜色
        history[existingIndex].timestamp = timestamp;
        history[existingIndex].barcodeColor = barcodeColor;
        history[existingIndex].backgroundColor = backgroundColor;
    } else {
        // 如果不存在，添加新记录
        history.unshift({
            input: input,
            timestamp: timestamp,
            barcodeColor: barcodeColor,
            backgroundColor: backgroundColor
        });
    }
    
    // 限制历史记录数量为20条
    if (history.length > 20) {
        history = history.slice(0, 20);
    }
    
    localStorage.setItem('barcodeHistory', JSON.stringify(history));
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('barcodeHistory') || '[]');
      historyList.innerHTML = history.map(item => `
        <div class="history-item flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div class="flex-1">
                <div class="flex items-center space-x-3">
                    <span class="font-medium text-gray-800 transition-colors duration-300">${item.input}</span>
                    ${item.barcodeColor && item.backgroundColor ? `
                        <div class="flex items-center space-x-1">
                            <div class="w-4 h-4 rounded border border-gray-300" 
                                 style="background-color: ${item.backgroundColor}; border-color: ${item.barcodeColor};">
                                <div class="w-1 h-full" style="background-color: ${item.barcodeColor}; margin: 0 auto;"></div>
                            </div>
                            <span class="text-xs text-gray-500">${item.barcodeColor}</span>
                        </div>
                    ` : ''}
                </div>
                <span class="text-sm text-gray-500 transition-colors duration-300">${item.timestamp}</span>
            </div>
            <div class="flex space-x-2">
                <button onclick="regenerateBarcode('${item.input}', '${item.barcodeColor || '#000000'}', '${item.backgroundColor || '#ffffff'}')" 
                        class="text-blue-500 hover:text-blue-600 transition duration-200 click-effect">
                    重新生成
                </button>
                <button onclick="removeFromHistory('${item.input}')" 
                        class="text-red-500 hover:text-red-600 transition duration-200 click-effect">
                    删除
                </button>
            </div>
        </div>
    `).join('');
    
    // 为新生成的按钮添加点击特效
    addClickEffectsToButtons();
}

function clearHistory() {
    if (confirm('确定要清除所有历史记录吗？')) {
        localStorage.removeItem('barcodeHistory');
        updateHistoryDisplay();
        showToast('历史记录已清除', 'info');
    }
}

function removeFromHistory(input) {
    let history = JSON.parse(localStorage.getItem('barcodeHistory') || '[]');
    history = history.filter(item => item.input !== input);
    localStorage.setItem('barcodeHistory', JSON.stringify(history));
    updateHistoryDisplay();
    showToast('已从历史记录中删除', 'info');
}

function regenerateBarcode(input, barcodeColor = '#000000', backgroundColor = '#ffffff') {
    const inputElement = document.getElementById('barcodeInput');
    const barcodeColorInput = document.getElementById('barcodeColor');
    const backgroundColorInput = document.getElementById('backgroundColor');
    
    inputElement.value = input;
    barcodeColorInput.value = barcodeColor;
    backgroundColorInput.value = backgroundColor;
    
    // 更新颜色值显示
    updateColorDisplay();
    
    // 触发input事件来更新计数器
    const event = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(event);
    
    showToast('正在重新生成条形码...', 'info');
    generateBarcode();
}

// 生成条形码
function generateBarcode() {
    const input = document.getElementById('barcodeInput').value.replace(/\D/g, ''); // 只保留数字
    const inputElement = document.getElementById('barcodeInput');
    const generateBtn = event ? event.target : document.querySelector('button[onclick="generateBarcode()"]');
    
    if (!input) {
        shakeElement(inputElement);
        showToast('请输入数字！', 'error');
        inputElement.focus();
        return;
    }
    
    if (!/^\d+$/.test(input)) {
        shakeElement(inputElement);
        showToast('请输入有效的数字！', 'error');
        inputElement.focus();
        return;
    }
    
    // 添加加载动画
    if (generateBtn) {
        applyLoadingEffect(generateBtn);
    }try {
        // 获取自定义颜色
        const barcodeColor = document.getElementById('barcodeColor').value;
        const backgroundColor = document.getElementById('backgroundColor').value;
        
        JsBarcode("#barcodeCanvas", input, {
            format: "CODE128",
            width: 2,
            height: 100,
            displayValue: true,
            fontSize: 20,
            font: "Arial",
            textAlign: "center",
            textPosition: "bottom",
            textMargin: 2,
            background: backgroundColor,
            lineColor: barcodeColor
        });// 移除加载动画
        setTimeout(() => {
            if (generateBtn) {
                removeLoadingEffect(generateBtn);
            }
            // 显示成功提示
            showToast('条形码生成成功！', 'success');        }, 300);
          // 保存到历史记录（包含颜色信息）
        saveToHistory(input, barcodeColor, backgroundColor);
    } catch (e) {
        if (generateBtn) {
            removeLoadingEffect(generateBtn);
        }
        shakeElement(inputElement);
        showToast('生成条形码时出错：' + e.message, 'error');
    }
}

// 下载条形码
function downloadBarcode() {
    const canvas = document.getElementById('barcodeCanvas');
    const downloadBtn = event.target;
    const input = document.getElementById('barcodeInput').value.replace(/\D/g, ''); // 获取纯数字
    
    if (!canvas.toDataURL) {
        showToast('您的浏览器不支持下载功能！', 'error');
        return;
    }
    
    if (!input) {
        showToast('请先生成条形码！', 'warning');
        return;
    }

    // 添加加载效果
    applyLoadingEffect(downloadBtn);

    // 模拟下载处理时间
    setTimeout(() => {        const link = document.createElement('a');
        // 使用输入的数字作为文件名
        link.download = `barcode_${input}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // 移除加载效果并显示成功特效
        removeLoadingEffect(downloadBtn);
        showSuccessEffect(downloadBtn);
        showToast(`条形码已下载为：barcode_${input}.png`, 'success');
    }, 500);
}

// 打印条形码
function printBarcode() {
    const input = document.getElementById('barcodeInput').value.replace(/\s+/g, '');
    if (!input) {
        showToast('请先生成条形码！', 'warning');
        return;
    }

    // 打开打印设置模态对话框
    openPrintModal();
}

// 打开打印设置模态对话框
function openPrintModal() {
    const modal = document.getElementById('printModal');
    modal.classList.remove('hidden');
    
    // 添加打开动画
    setTimeout(() => {
        modal.querySelector('.bg-white').style.transform = 'scale(1)';
        modal.querySelector('.bg-white').style.opacity = '1';
    }, 10);
    
    // 更新预览
    updatePrintPreview();
    
    // 重置预设按钮样式
    const presetButtons = document.querySelectorAll('[onclick^="applyPrintPreset"]');
    presetButtons.forEach(btn => {
        btn.classList.remove('bg-blue-100', 'text-blue-700');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    
    // 高亮当前预设（如果匹配）
    const width = document.getElementById('printWidth').value;
    const height = document.getElementById('printHeight').value;
    highlightCurrentPreset(width, height);
}

// 关闭打印设置模态对话框
function closePrintModal() {
    const modal = document.getElementById('printModal');
    const modalContent = modal.querySelector('.bg-white');
    
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 200);
}

// 调整打印数量
function adjustPrintQuantity(delta) {
    const quantityInput = document.getElementById('printQuantity');
    let currentValue = parseInt(quantityInput.value) || 1;
    let newValue = currentValue + delta;
    
    // 限制范围
    newValue = Math.max(1, Math.min(1000, newValue));
    
    quantityInput.value = newValue;
    updatePrintPreview();
    
    // 添加脉冲效果
    quantityInput.classList.add('pulse-effect');
    setTimeout(() => {
        quantityInput.classList.remove('pulse-effect');
    }, 300);
}

// 更新打印预览
function updatePrintPreview() {
    const quantity = parseInt(document.getElementById('printQuantity').value) || 1;
    const width = parseInt(document.getElementById('printWidth').value) || 3;
    const height = parseInt(document.getElementById('printHeight').value) || 120;
    
    const quantityPreview = document.getElementById('quantityPreview');
    const layoutPreview = document.getElementById('layoutPreview');
    
    quantityPreview.textContent = quantity;
    
    // 获取布局信息
    const layoutInfo = getPrintLayoutInfo(width, height, quantity);
    
    // 更新布局描述
    let layoutDescription = '';
    switch (layoutInfo.layoutClass) {
        case 'compact':
            layoutDescription = `${layoutInfo.description}紧凑网格布局 (节省纸张)`;
            break;
        case 'grid':
            layoutDescription = `${layoutInfo.description}网格布局`;
            break;
        case 'list':
            if (quantity === 1) {
                layoutDescription = `${layoutInfo.description}单个居中打印`;
            } else {
                layoutDescription = `${layoutInfo.description}垂直列表布局`;
            }
            break;
        default:
            layoutDescription = '自适应布局';
    }
    
    layoutPreview.textContent = layoutDescription;
    
    // 更新小型预览
    updateMiniPreview(width, height);
}

// 更新小型预览画布
function updateMiniPreview(width, height) {
    const miniCanvas = document.getElementById('miniPreviewCanvas');
    const input = document.getElementById('barcodeInput').value.replace(/\s+/g, '');
    
    if (!miniCanvas || !input) {
        return;
    }
    
    try {
        // 获取当前颜色设置
        const barcodeColor = document.getElementById('barcodeColor').value;
        const backgroundColor = document.getElementById('backgroundColor').value;
        
        // 生成小型预览条形码
        JsBarcode(miniCanvas, input, {
            format: "CODE128",
            width: Math.max(1, width * 0.5), // 缩放宽度
            height: Math.max(20, height * 0.3), // 缩放高度
            displayValue: false,
            background: backgroundColor,
            lineColor: barcodeColor,
            margin: 5
        });
    } catch (e) {
        // 如果生成失败，显示占位符
        const ctx = miniCanvas.getContext('2d');
        ctx.fillStyle = '#f3f4f6';
        ctx.fillRect(0, 0, miniCanvas.width, miniCanvas.height);
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('预览', miniCanvas.width / 2, miniCanvas.height / 2 + 4);
    }
}

// 应用打印预设
function applyPrintPreset(width, height) {
    const widthSelect = document.getElementById('printWidth');
    const heightSelect = document.getElementById('printHeight');
    
    widthSelect.value = width;
    heightSelect.value = height;
    
    updatePrintPreview();
    
    // 添加视觉反馈
    const buttons = document.querySelectorAll('[onclick^="applyPrintPreset"]');
    buttons.forEach(btn => btn.classList.remove('bg-blue-100', 'text-blue-700'));
    
    event.target.classList.add('bg-blue-100', 'text-blue-700');
    
    showToast(`已应用${getPresetName(width, height)}预设`, 'success');
}

// 获取预设名称
function getPresetName(width, height) {
    if (width == 2 && height == 80) return '小标签';
    if (width == 3 && height == 120) return '标准';
    if (width == 4 && height == 150) return '大标签';
    return '自定义';
}

// 高亮当前预设
function highlightCurrentPreset(width, height) {
    const presetButtons = document.querySelectorAll('[onclick^="applyPrintPreset"]');
    
    presetButtons.forEach(btn => {
        const onclick = btn.getAttribute('onclick');
        const match = onclick.match(/applyPrintPreset\((\d+),\s*(\d+)\)/);
        
        if (match) {
            const presetWidth = match[1];
            const presetHeight = match[2];
            
            if (presetWidth == width && presetHeight == height) {
                btn.classList.remove('bg-gray-100', 'text-gray-700');
                btn.classList.add('bg-blue-100', 'text-blue-700');
            }
        }
    });
}

// 确认打印
function confirmPrint() {
    const input = document.getElementById('barcodeInput').value.replace(/\s+/g, '');
    const quantity = parseInt(document.getElementById('printQuantity').value) || 1;
    const width = parseInt(document.getElementById('printWidth').value) || 3;
    const height = parseInt(document.getElementById('printHeight').value) || 120;
    
    // 获取自定义颜色
    const barcodeColor = document.getElementById('barcodeColor').value;
    const backgroundColor = document.getElementById('backgroundColor').value;

    // 关闭模态对话框
    closePrintModal();
    
    // 创建打印用的画布和容器
    const printCanvas = document.getElementById('printCanvas');
    const barcodeNumber = document.querySelector('.barcode-number');
    const printArea = document.getElementById('printArea');
    const printContent = printArea.querySelector('.print-content');
    
    // 清空现有内容和样式
    printContent.innerHTML = '';
    printContent.className = 'print-content';
    
    // 根据尺寸和数量决定布局模式
    const layoutInfo = getPrintLayoutInfo(width, height, quantity);
    printContent.classList.add(layoutInfo.layoutClass);
    
    // 根据数量生成多个条形码
    for (let i = 0; i < quantity; i++) {
        const barcodeContainer = document.createElement('div');
        barcodeContainer.className = `barcode-container ${layoutInfo.sizeClass}`;
        
        const canvas = document.createElement('canvas');
        canvas.className = 'print-barcode-canvas';
        
        const numberDiv = document.createElement('div');
        numberDiv.className = `barcode-number ${layoutInfo.sizeClass}`;
        numberDiv.textContent = input;
        
        barcodeContainer.appendChild(canvas);
        barcodeContainer.appendChild(numberDiv);
        printContent.appendChild(barcodeContainer);
        
        try {
            JsBarcode(canvas, input, {
                format: "CODE128",
                width: width,
                height: height,
                displayValue: false,
                background: backgroundColor,
                lineColor: barcodeColor,
                margin: layoutInfo.margin
            });
        } catch (e) {
            showToast('生成打印条形码时出错：' + e.message, 'error');
            return;
        }
    }
    
    // 调用打印
    setTimeout(() => {
        showToast(`正在打印${quantity}个${layoutInfo.description}条形码...`, 'info');
        window.print();
    }, 300);
}

// 获取打印布局信息
function getPrintLayoutInfo(width, height, quantity) {
    // 判断条形码尺寸等级
    const totalSize = width * height;
    let sizeClass, layoutClass, margin, description;
    
    if (totalSize <= 240) { // 小尺寸 (如 2x80, 3x80)
        sizeClass = 'compact';
        margin = 5;
        description = '紧凑型';
        
        if (quantity >= 8) {
            layoutClass = 'compact'; // 紧凑网格布局
        } else if (quantity >= 3) {
            layoutClass = 'grid'; // 网格布局
        } else {
            layoutClass = 'compact'; // 即使数量少也使用紧凑布局节省空间
        }
        
    } else if (totalSize <= 480) { // 中等尺寸 (如 3x120, 4x100)
        sizeClass = 'standard';
        margin = 10;
        description = '标准';
        
        if (quantity >= 6) {
            layoutClass = 'grid';
        } else if (quantity >= 2) {
            layoutClass = 'grid';
        } else {
            layoutClass = 'list'; // 单个大条形码居中
        }
        
    } else { // 大尺寸 (如 4x150, 5x120+)
        sizeClass = 'large';
        margin = 15;
        description = '大型';
        
        if (quantity >= 4) {
            layoutClass = 'list'; // 列表布局
        } else if (quantity >= 2) {
            layoutClass = 'grid'; // 网格布局
        } else {
            layoutClass = 'list'; // 单个居中
        }
    }
    
    return {
        sizeClass,
        layoutClass,
        margin,
        description
    };
}

// 黑夜模式切换功能
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const darkModeText = document.getElementById('darkModeText');
    const html = document.documentElement;
    
    // 从localStorage读取黑夜模式状态
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // 设置初始状态
    if (isDarkMode) {
        html.classList.add('dark');
        updateDarkModeButton(true);
    }
    
    // 更新按钮显示
    function updateDarkModeButton(isDark) {
        if (isDark) {
            darkModeIcon.textContent = '☀️';
            darkModeText.textContent = '日间模式';
        } else {
            darkModeIcon.textContent = '🌙';
            darkModeText.textContent = '黑夜模式';
        }
    }
    
    // 切换黑夜模式
    function toggleDarkMode() {
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('darkMode', isDark);
        updateDarkModeButton(isDark);
        
        // 显示切换提示
        showToast(isDark ? '已切换到黑夜模式' : '已切换到日间模式', 'info');
    }
    
    // 添加点击事件
    darkModeToggle.addEventListener('click', function(e) {
        createRippleEffect(e, this);
        this.classList.add('pulse-effect');
        setTimeout(() => {
            this.classList.remove('pulse-effect');
        }, 300);
        
        toggleDarkMode();
    });
}

// 颜色相关函数
function applyColorPreset(barcodeColor, backgroundColor) {
    const barcodeColorInput = document.getElementById('barcodeColor');
    const backgroundColorInput = document.getElementById('backgroundColor');
    
    barcodeColorInput.value = barcodeColor;
    backgroundColorInput.value = backgroundColor;
    
    updateColorDisplay();
    showToast('已应用颜色预设', 'success');
}

function updateColorDisplay() {
    const barcodeColorValue = document.getElementById('barcodeColorValue');
    const backgroundColorValue = document.getElementById('backgroundColorValue');
    const barcodeColor = document.getElementById('barcodeColor').value;
    const backgroundColor = document.getElementById('backgroundColor').value;
    
    if (barcodeColorValue) barcodeColorValue.textContent = barcodeColor;
    if (backgroundColorValue) backgroundColorValue.textContent = backgroundColor;
}

function initColorPickers() {
    const barcodeColorInput = document.getElementById('barcodeColor');
    const backgroundColorInput = document.getElementById('backgroundColor');
    
    // 添加颜色变化事件监听器
    barcodeColorInput.addEventListener('change', updateColorDisplay);
    backgroundColorInput.addEventListener('change', updateColorDisplay);
    
    // 初始化颜色显示
    updateColorDisplay();
}

// 切换颜色设置面板
function toggleColorSettings() {
    const colorSettings = document.getElementById('colorSettings');
    const toggleIcon = document.getElementById('colorToggleIcon');
    
    if (colorSettings.classList.contains('hidden')) {
        // 展开
        colorSettings.classList.remove('hidden');
        colorSettings.style.animation = 'slideDown 0.3s ease-out';
        toggleIcon.style.transform = 'rotate(180deg)';
        showToast('展开颜色设置', 'info');
    } else {
        // 折叠
        colorSettings.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            colorSettings.classList.add('hidden');
        }, 300);
        toggleIcon.style.transform = 'rotate(0deg)';
        showToast('折叠颜色设置', 'info');
    }
}

// 添加回车键支持
document.getElementById('barcodeInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateBarcode();
    }
});

// 页面加载时显示历史记录
document.addEventListener('DOMContentLoaded', function() {
    updateHistoryDisplay();
    addClickEffectsToButtons();
    addInputEffects();
    addShakeCSS();
    initDarkMode(); // 初始化黑夜模式
    initColorPickers(); // 初始化颜色选择器
    initPrintModal(); // 初始化打印模态对话框
});

// 初始化打印模态对话框
function initPrintModal() {
    const modal = document.getElementById('printModal');
    const quantityInput = document.getElementById('printQuantity');
    const widthSelect = document.getElementById('printWidth');
    const heightSelect = document.getElementById('printHeight');
    
    // 从localStorage加载打印设置
    loadPrintSettings();
    
    // 点击模态背景关闭对话框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePrintModal();
        }
    });
    
    // ESC键关闭对话框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closePrintModal();
        }
        
        // 在模态对话框中的键盘快捷键
        if (!modal.classList.contains('hidden')) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                confirmPrint();
            } else if (e.key === 'ArrowUp' && e.ctrlKey) {
                e.preventDefault();
                adjustPrintQuantity(1);
            } else if (e.key === 'ArrowDown' && e.ctrlKey) {
                e.preventDefault();
                adjustPrintQuantity(-1);
            }
        }
    });
      // 监听数量输入变化
    quantityInput.addEventListener('input', function() {
        let value = parseInt(this.value) || 1;
        value = Math.max(1, Math.min(1000, value));
        this.value = value;
        updatePrintPreview();
        savePrintSettings();
    });
    
    // 监听尺寸选择变化
    widthSelect.addEventListener('change', function() {
        updatePrintPreview();
        highlightCurrentPreset(this.value, heightSelect.value);
        savePrintSettings();
    });
    
    heightSelect.addEventListener('change', function() {
        updatePrintPreview();
        highlightCurrentPreset(widthSelect.value, this.value);
        savePrintSettings();
    });
    
    // 设置初始样式
    const modalContent = modal.querySelector('.bg-white');
    modalContent.style.transform = 'scale(0.9)';
    modalContent.style.opacity = '0';
    modalContent.style.transition = 'all 0.2s ease';
}

// 保存打印设置到localStorage
function savePrintSettings() {
    const settings = {
        quantity: document.getElementById('printQuantity').value,
        width: document.getElementById('printWidth').value,
        height: document.getElementById('printHeight').value
    };
    
    localStorage.setItem('printSettings', JSON.stringify(settings));
}

// 从localStorage加载打印设置
function loadPrintSettings() {
    try {
        const settings = JSON.parse(localStorage.getItem('printSettings'));
        if (settings) {
            document.getElementById('printQuantity').value = settings.quantity || 1;
            document.getElementById('printWidth').value = settings.width || 3;
            document.getElementById('printHeight').value = settings.height || 120;
        }
    } catch (e) {
        // 使用默认设置
        console.log('使用默认打印设置');
    }
}