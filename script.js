
document.addEventListener("DOMContentLoaded", function () {

    // スライドショー制御
    const slides = document.querySelectorAll('.slideshow img');
    const texts = document.querySelectorAll('.slideshow .text-overlay');
    let currentSlide = 0;

    function showNextSlide() {
        // 現在のスライドとテキストを非表示に
        slides[currentSlide].classList.remove('active');
        texts[currentSlide].classList.remove('active');

        // アニメーション再生のために再描画トリガー
        void texts[currentSlide].offsetWidth;

        // 次のスライド番号を計算
        currentSlide = (currentSlide + 1) % slides.length;

        // 新しいスライドとテキストを表示
        slides[currentSlide].classList.add('active');
        texts[currentSlide].classList.add('active');
    }

    setInterval(showNextSlide, 3000); // 3秒間隔でスライド切り替え



    // グローバルナビのスクロール制御
    const navbar = document.getElementById('navbar');
    const navbarOffset = navbar.offsetTop;
    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= navbarOffset) {
            navbar.classList.add('fixed'); // 上部に固定
        } else {
            navbar.classList.remove('fixed'); // 元の位置に戻す
        }
    });


    // ハンバーガーメニュー制御
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.gnavi ul');
    const menuItems = document.querySelectorAll('.gnavi ul li'); // メニュー項目を取得
    const topImage = document.getElementById('navbar'); // TOPを飛ばす 移動用

    hamburger.addEventListener('click', () => {
        const isOpen = menu.classList.contains('open');

        // メニュー開閉の切り替え
        menu.classList.toggle('open');
        document.body.classList.toggle("menu-open");

        // メニューが「開かれた」ときのみスクロール実行
        if (!isOpen && topImage) {
            setTimeout(() => {
                topImage.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 300); // メニュー開くアニメーションに合わせて少し遅延
        }
    });

    // メニュー項目クリックで閉じる動作
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('open'); // openクラスを削除して閉じる
            document.body.classList.remove("menu-open");
        });
    });



    // タブコンテンツ＿特徴タブ切り替え制御
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.content');
    const contentContainer = document.querySelector('.content-container'); // コンテナの取得

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 全タブのリセット
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.getAttribute('data-tab');

            // コンテンツの表示制御
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                }
            });

            // コンテナ枠線のクラス切り替え
            contentContainer.className = 'content-container';
            contentContainer.classList.add(`${target}-active`);
        });
    });


    // コンセプトエリア画像切替え
    window.showImage = function (buttonNumber) {
        const imageElement = document.getElementById("display-image");
        const placeholder = document.getElementById("placeholder");

        const imageSources = {
            1: "img/concept_1.jpg",
            2: "img/concept_2.jpg",
            3: "img/concept_3.jpg"
        };

        imageElement.src = imageSources[buttonNumber];
        imageElement.style.display = "block";
        placeholder.style.display = "none";
    }    

    
    //パララックス処理
    window.addEventListener('scroll', function () {
        const parallax = document.getElementById('parallax_bg');
        const scrollY = window.scrollY;
        const offsetTop = parallax.offsetTop;
        const height = parallax.offsetHeight;

        // パララックス効果を与える範囲内のみ処理
        if (scrollY + window.innerHeight > offsetTop && scrollY < offsetTop + height) {
                const speed = 0.2; // スクロール速度係数
                const yPos = (scrollY - offsetTop) * speed * 2;
                parallax.style.backgroundPosition = `center ${yPos}px`;
            }
    });
    
    
});

