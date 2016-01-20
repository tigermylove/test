
function openDB(name, version) {
    var version = version || 1;
    //打开数据库 如果没有 那么创建********
    var request = window.indexedDB.open(name, version);
    //出错执行
    request.onerror = function (e) {
        console.log(e.currentTarget.error.message);
    };
    //成功执行
    request.onsuccess = function (e) {
        myDB.db = e.target.result;
    };
    //提升需要？提升数据库版本？
    request.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('students')) {
            db.createObjectStore('students', { autoIncrement: true });
        }
        console.log('DB version changed to ' + version);
    };
}

function closeDB(db) {
    db.close();
}
function deleteDB(name) {
    indexedDB.deleteDatabase(name);
}

//********************************************************************************************
//添加数据
function addData(db, storeName, object) {
    //transaction如同webSQL objectStore 读写 新增一张名为storename的表？打开 没有新增
    var transaction = db.transaction([storeName], 'readwrite');
    //获取这张表？
    var store = transaction.objectStore(storeName);

    for (var i = 0; i < object.length; i++) {
        //给这张表新增数据 key自增数 value是数组中每个对象
        store.add(object[i]);
    }
}
//获得数据
function getDataByKey(db, storeName, key) {
    //打开 没有新增
    var transaction = db.transaction(storeName, 'readwrite');
    //表
    var store = transaction.objectStore(storeName);
    //根据 获得值
    var request = store.get(key);
    //成功打印
    request.onsuccess = function (e) {
        var object = e.target.result;
        console.log(object);
    };
}
//改 增删改查只有这个有问题有问题
function updateDataByKey(db, storeName, key, newObject) {
    var transaction = db.transaction(storeName, 'readwrite');
    var store = transaction.objectStore(storeName);
    var request = store.get(key);

    request.onsuccess = function (e) {
        request.result.name = newObject.name;
        console.log(request.result);
        store.put(request.result);
    };
}
//删
function deleteDataByKey(db, storeName, key) {
    var transaction = db.transaction(storeName, 'readwrite');
    var store = transaction.objectStore(storeName);
    store.delete(key);
}
//********************************************************************************************
//清空所有数据
function clearObjectStore(db, storeName) {
    var transaction = db.transaction(storeName, 'readwrite');
    var store = transaction.objectStore(storeName);
    store.clear();
}