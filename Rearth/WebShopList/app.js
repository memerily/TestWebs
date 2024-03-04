document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', handleSearchInput);

    // JSONデータを取得して表示する関数
    async function fetchData() {
        const jsonDataUrl = 'data.json'; // 本来のデータの URL に置き換えてください

        try {
            const response = await fetch(jsonDataUrl);
            const data = await response.json();
            displayData(data);
        } catch (error) {
            console.error('データの取得エラー:', error);
        }
    }

    // JSONデータを表示する関数
    function displayData(data) {
        const appElement = document.getElementById('app');
        appElement.innerHTML = ''; // 既存のコンテンツをクリア

        // テーブルとヘッダー行の作成
        const table = document.createElement('table');
        const headerRow = table.insertRow(0);

        // ヘッダーの定義
        const headers = ['アイテム', '値段', '個数', '備考'];

        // ヘッダーセルの作成
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        // データを含む行の追加
        data.forEach(item => {
            // 検索キーワードが存在し、アイテム名に検索キーワードが含まれていない場合はスキップ
            if (searchInput.value.trim() !== '' && !item.Item.toLowerCase().includes(searchInput.value.toLowerCase())) {
                return;
            }

            const row = table.insertRow(-1);

            // ヘッダーに対応するキーの定義
            const keys = ['Item', 'price', 'quantity', 'remark'];

            // セルの作成とデータの埋め込み
            keys.forEach(key => {
                const cell = row.insertCell(-1);

                if (key === 'remark') {
                    // 備考の場合、改行をHTMLの改行要素に変換
                    cell.innerHTML = item[key].replace(/\n/g, '<br>');
                } else {
                    cell.textContent = item[key];
                }
            });
        });

        // テーブルをアプリ要素に追加
        appElement.appendChild(table);
    }

    // 検索バーの入力が変更されたときにデータを再表示する
    function handleSearchInput() {
        fetchData();
    }

    // 初回表示を行う
    fetchData();
});
