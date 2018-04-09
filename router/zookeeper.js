/**
 * manage zookeeper client
 *
 * @author zzxun <xtkml.g@gmail.com>
 */
'use strict';

/**
 * module dependencies
 */
const _ = require('lodash');
const zookeeper = require('node-zookeeper-client');
const CreateMode = zookeeper.CreateMode;

class ZookeeperService  {

  constructor(options) {

    let self = this;

    self._root = options.root;
    // initial
    options = _.merge({
      connect       : '127.0.0.1:2181',
      sessionTimeout: 20000,
      root:'/registry',
    }, options);

    self._zk = zookeeper.createClient(options.connect, options);

    self._zk.connect();

    self._zk.once('connected', (err) => {
      if (err) {
        console.error('zookeeper connect error :' + err);
        throw err;
      }

      self._connected = true;

      self._createNode(self._root, '', CreateMode.PERSISTENT)
        .then(() => {
          console.log('Connected to zookeeper ' + options.connect);
        })
        .catch((err) => {
          throw err;
        });
    });

    setTimeout(() => {
      if (!self._connected) {
        console.error('zookeeper connect timeout');
        throw new Error('zookeeper connect timeout');
      }
    }, options.sessionTimeout);


  }

  /**
   * save data to adapter
   *
   * @param {Object} key
   * @param {String|Object} data
   * @returns {Promise|bluebird|*}
   */
  save(key, data) {
    // PERSISTENT for service *
    let folder = this._root + utils.KEY({slash: '/', alias: key.alias});
    let keyStr = folder + utils.KEY({slash: '/', alias: key.alias, id: key.id});
    return this._createNode(folder, '', CreateMode.PERSISTENT)
      .then(() => {
        return this.del(keyStr);
      })
      .then(() => {
        // create `Ephemeral Node` for each providers

         console.log('zookeeper --save key:' + keyStr + ',data:' + data);

        return this._createNode(keyStr, data, CreateMode.EPHEMERAL);
      });
  }

  *createNode(path, data, mode)
  {
     let promise = this._createNode(path,data,mode);
     return yield promise;
  }

  _createNode(path, data, mode) {
    return new Promise((resolve, reject) => {
      this._zk.create(path, new Buffer(data), mode, (error, regPath) => {

        if (error) {
          if (error.getCode() === zookeeper.Exception.NODE_EXISTS ||
            error.getCode() === zookeeper.Exception.OK) {
            console.error('Create or Exist path: ' + path );
          } else {
            // other error
            return reject(error);
          }
        }

        return resolve(true);
      });
    });
  }


  /**
   * get key string
   * @param {Object} keyObj
   */
  getKey(keyObj) {
    if (_.isString(keyObj)) {
      return keyObj;
    }
    return this._root + utils.KEY({slash: '/', alias: keyObj.alias}) +
      utils.KEY({slash: '/', alias: keyObj.alias, id: keyObj.id});
  }

  /**
   * subscribe this._root / alias
   * @param {Object} keyObj
   * @param {Function} callback
   */
  subscribe(keyObj, callback) {
    let path = this._root + utils.KEY({slash: '/', alias: keyObj.alias});
    let watcher = (event) => {
      if (event.getType() === zookeeper.Event.NODE_CHILDREN_CHANGED) {
        this._zk.getChildren(path, watcher, (error, childrens) => {
          if (error && error.getCode() !== 0) {
            callback(error, []);
          } else {
            callback(null, childrens);
          }
        });
      }
    };
    this._zk.getChildren(path, watcher, () => {
    });
  }


  *getChild(path)
  {
    return yield this.getListKeys(path);
  }


  /**
   * get all available services key name
   * @param pattern
   * @return {Promise|bluebird|*}
   */
  getListKeys(pattern) {
    return new Promise((resolve, reject) => {
      this._zk.getChildren(pattern, (error, childrens) => {
        if (error && error.getCode() !== 0) {
          return reject(error);
        }
       /* childrens = _.map(childrens, (child) => {
          return pattern + '/' + child;
        });*/

        console.log('zookeeper getListkeys pattern:' + pattern +
            ' ,childrens:' + JSON.stringify(childrens));

        return resolve(childrens);
      });
    });
  }

  /**
   * get values of all keys
   * @param keys
   */
  getListValues(keys) {
    let values = [];
    return Promise.map(keys, (key) => {
      return new Promise((resolve) => {
        this._zk.getData(key, (error, data) => {
          return resolve(data ? data.toString() : '');
        });
      }).then((data) => {
        values.push(data);
      });
    }).then(() => {
      return (values);
    });
  }

  /**
   * delete
   * @param {Object} keyObj
   * @returns {*}
   */
  del(keyObj) {
    let path = this.getKey(keyObj);
    return new Promise((resolve) => {
      this._zk.remove(path, () => {
        return resolve(true);
      });
    });
  }
}

module.exports = ZookeeperService;

