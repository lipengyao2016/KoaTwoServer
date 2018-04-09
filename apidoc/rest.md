## REST API 核心概念  
***
这一章节主要介绍 `REST API` 的核心概念，以及如何操作`PFSP`提供的各类资源。  
  
*以下所介绍的内容，是你了解 `PFSP` API 必不可少的内容。你应该熟悉它，否者可能会影响你对使用。*
***
###  基础 URL 

在`PFSP`中，所有URL都包含以下前缀：  

```
http://pfsp.cyhl.com.cn/      (注：目前还没有使用域名)
http://192.168.6.16:7000/     (注：此地址为测试环境)
```

在`PFSP`中，所有API接口RUL都包含以下前缀：

```
http://pfsp.cyhl.com.cn/api/:version/  
http://192.168.6.16:7000/api/:version/     (注：version为版本号)
```

在`PFSP`的接口文档描述URL：

```
http://pfsp.cyhl.com.cn/docs/  
http://192.168.6.16:7000/docs/     
```

***
###  资源标识符  

每一个URL请求都含有资源的通用的唯一资源标识符( UUID )。它由22个字符组成，是国际通用唯一标识符uuid的MD5摘要值。
每一次URL请，如果成功，则返回一个带有UUID的URL的资源。如果失败，则返回一个Error信息。

***
###  访问权限

目前还未实现接口访问权限控制，**(*未来实现过后，再补充相关内容*)**。

预计将支持以下两种方式：
  -  Basic Authentication over HTTPS (基于HTTPS的Basic认证)
  -  Digest authentication (摘要认证)  

***
###  资源的创建、获取、更新和删除  

在`PFSP`中，资源的创建、获取、更新和删除动作，都是全量操作，及数据整体创建和更新。不支持部分创建与更新。

#### 创建资源

你可以通过对一个容器类资源URL，提交HTTP **POST**请求创建一个资源。
任何POST请求的body都必须是**JSON*结构体。
请求的body header中，都应该设置 `Content-Type: application/json`。  

POST请求返回响应体(Responses)包含以下内容：

  -  一个包含成功或失败的**HTTP标准状态码**（以下表格将描述具体状态码的内容）
  -  符合**HTTP标准的头信息**
  -  一个响应**Response body**体，它是一个JSON结构体，里面包含了成功的资源数据，或失败的Error信息

创建 POST 请求响应状态码：

|Response Code| Description|
|--|--|
|`201 CREATED`|The request was successful, we created a new resource, and the response body contains the representation. The Location header contains the new resource’s canonical URL  |
|`400 BAD REQUEST `|The data given in the POST failed validation. Inspect the response body for details.  |
|`401 UNAUTHORIZED`| Authentication credentials are required to access the resource. All requests must be authenticated. |	
|`403 FORBIDDEN`|The supplied authentication credentials are not sufficient to access the resource.|
|`404 NOT FOUND`|We could not locate the resource based on the specified URL.|
|`405 METHOD NOT ALLOWED`|POST is not supported for the resource.|
|`409 CONFLICT`|You cannot create or update a resource because another resource already exists or conflicts with one you are submitting.|
|`415 UNSUPPORTED MEDIA TYPE`|You did not specify the request Content-Type header to have a value of application/json. Only application/json is currently supported.|
|`429 TOO MANY REQUESTS`|Your application is sending too many simultaneous requests.|
|`500 SERVER ERROR`	|We could not create or update the resource. Please try again.|
|`503 SERVICE UNAVAILABLE`|We are temporarily unable to service the request. Please wait for a bit and try again.|

#### 获取资源

你可以通过对一个资源的URL，提交HTTP **GET**请求获取一个资源。

GET请求返回响应体(Responses)包含以下内容：

  -  一个包含成功或失败的**HTTP标准状态码**（以下表格将描述具体状态码的内容）
  -  符合**HTTP标准的头信息**
  -  一个响应**Response body**体，它是一个JSON结构体，里面包含了成功的资源数据，或失败的Error信息

获取 GET 请求响应状态码：

|Response Code| Description|
|--|--|
|`200 OK`|The request was successful and the response body contains the resource requested.|
|`302 FOUND`|A common redirect response; you can GET the resource at the URL found in the location response header.|
|`304 NOT MODIFIED`|Your client’s cached version of the representation is still up-to-date.|
|`400 BAD REQUEST`|The data given in the POST failed validation. Inspect the response body for details.|
|`401 UNAUTHORIZED`|Authentication credentials are required to access the resource. All requests must be authenticated.|
|`403 FORBIDDEN`|The supplied authentication credentials are not sufficient to access the resource.|
|`404 NOT FOUND`|We could not locate the resource based on the specified URL.|
|`429 TOO MANY REQUESTS`|Your application is sending too many simultaneous requests.|
|`500 SERVER ERROR`|We could not create or update the resource. Please try again.|
|`503 SERVICE UNAVAILABLE`|	We are temporarily unable to service the request. Please wait for a bit and try again.|

#### 更新资源

你可以通过对一个对象类资源URL，提交HTTP **POST**请求更新一个资源。
任何POST请求的body都必须是**JSON*结构体。
请求的body header中，都应该设置 `Content-Type: application/json`。  

POST请求返回响应体(Responses)包含以下内容：

  -  一个包含成功或失败的**HTTP标准状态码**（以下表格将描述具体状态码的内容）
  -  符合**HTTP标准的头信息**
  -  一个响应**Response body**体，它是一个JSON结构体，里面包含了成功的资源数据，或失败的Error信息

更新 POST 请求响应状态码：

|Response Code| Description|
|--|--|
|`200 OK`|The request was successful and the response body contains the resource requested.|
|`400 BAD REQUEST`|The data given in the POST failed validation. Inspect the response body for details.|
|`401 UNAUTHORIZED`|Authentication credentials are required to access the resource. All requests must be authenticated.|
|`403 FORBIDDEN`|The supplied authentication credentials are not sufficient to access the resource.|
|`404 NOT FOUND`|We could not locate the resource based on the specified URL.|
|`405 METHOD NOT ALLOWED`|POST is not supported for the resource.|
|`409 CONFLICT`|You cannot create or update a resource because another resource already exists or conflicts with one you are submitting.|
|`415 UNSUPPORTED MEDIA TYPE`|You did not specify the request Content-Type header to have a value of application/json. Only application/json is currently supported.|
|`429 TOO MANY REQUESTS`|Your application is sending too many simultaneous requests.|
|`500 SERVER ERROR`|We could not create or update the resource. Please try again.|
|`503 SERVICE UNAVAILABLE`|We are temporarily unable to service the request. Please wait for a bit and try again.|

#### 删除资源

你可以通过对一个对象类资源URL，提交HTTP **DELETE**请求删除一个资源。
注意：不是所有的对象类资源都支持删除操作。

删除 DELETE 请求响应状态码：

|Response Code| Description|
|--|--|
|`204 NO CONTENT`|The request was successful; the resource was deleted. The deleted resource will not be returned.|
|`401 UNAUTHORIZED`|Authentication credentials are required to access the resource. All requests must be authenticated.|
|`403 FORBIDDEN`|The supplied authentication credentials are not sufficient to access the resource.|
|`404 NOT FOUND`|We could not locate the resource based on the specified URL.|
|`405 METHOD NOT ALLOWED`|DELETE is not supported for the resource.|
|`429 TOO MANY REQUESTS`|Your application is sending too many simultaneous requests.|
|`500 SERVER ERROR`|We could not create or update the resource. Please try again.|
|`503 SERVICE UNAVAILABLE`|We are temporarily unable to service the request. Please wait for a bit and try again.|



***
### REST Error 结构体 

REST API 返回的响应体中HTTP 状态码为400、403、404、500等时，则Body为一个Error错误结构体。
包含以下内容

|属性| 类型|描述|
|--|--|--|
|`name`|String|	错误的名称|
|`code`|Number|	`PFSP`内部定义的错误码，可以获取更详细的信息|
|`message`|	String|错误的信息|
|`description`|	String|错误的一些简单描述|
|`stack`|String|服务器内部堆栈信息，方便测试环境中调式，生产环境中此项为空|


***
### 容器资源  

容器资源是一个包含其它资源的资源，它本身是一个资源，所以它除了包含其它资源外，它还有自己的属性。  

容器属性:

|属性| 类型|有效值|描述|
|--|--|--|--|
|`href`|String|	N/A|容器资源的完整URL|
|`createdAt`|String|ISO-8601 Datetime|容器的创建时间|
|`modifiedAt`|String|ISO-8601 Datetime|容器的最后修改时间|
|`offset`|Number|Default is 0.|	用于分页，返回子资源的起始偏移量|
|`limit`|Number|Default is 25.|	用于分页， 返回offset偏移量后子资源的数量，最大值为100|
|`size`|Number|	N/A|容器资源下，子资源items的总数量|
|`items`|Array|	N/A	|一个资源数据，每个资源都包含自己的href和属性|

容器资源除了具体容纳其它资源外，它还支持[`分页`](#_9)、[`排序`](#_10)、[`搜索`](#_11)操作。

#### 分页  

当一个容器资源下，子资源实例数据量过多时，我们不能一次性获取数据，需要多次分页请求获取。

查询参数  
有两个可选的查询参数，可以指定控制分页：

  - `offset` : 指定在整个集合的基于`0`的起始索引中，找到offset索引位，作为第一个返回项，默认值为`0`。
  - `limit`  : 请求查询返回项的最大数量，最小值为`1`，最大值为`100`,默认为`25`。

下面的请求查询实例中，在服务器上对一个容器资源，将从offset=10（第11元素）开始，查询资源，最大获取40个元素：
```javascrip
curl --request GET \
--header 'content-type: application/json' \
--url "http://pfsp.cyhl.com.cn/api/v1/plugins?offset=10&limit=40"
```

Response 200 :
```javascrip
{
  "href": "http://pfsp.cyhl.com.cn/api/v1/plugins?offset=10&limit=40",
  "offset": 10,
  "limit": 40,
  "size" : 100
  "items": [
    {
      "key": "value",
        ... ...
    },
        ... ...
  ]
}
```


#### 排序 

一个容器资源查询请求，还支持排序操作，只需要增加一个可选的`orderBy`参数,参数值以逗号(` , `)分隔。
每个需要排序属性后还可以标识一个升序或降序的标识。

实例： (注：在 URL encode 中，`%2C`表示逗号) 
```
curl --request GET \
--header 'content-type: application/json' \
--url "http://pfsp.cyhl.com.cn/api/v1/plugins?orderBy=orderStatement1%2CorderStatement2%2C...%2CorderStatementN"
```

URL decode解码过后：
```
http://pfsp.cyhl.com.cn/api/v1/plugins?orderBy=orderStatement1,orderStatement2,...,orderStatementN
```

每一个orderStatement的格式如下：
```sortableAttributeName optionalAscendingOrDescendingStatement```

`sortableAttributeName`： 指资源属性中支持可以排序的属性名称。  
`optionalAscendingOrDescendingStatement` ：由以下部分组成：
   * 一个`空格符`(在URL encode 中,`%20`表示空格符)
   * `asc` (升序) or `desc` (降序)
   * 如果没有定义此项，默认为`asc`

实例：以 name 升序 id 降序查询：
```
http://pfsp.cyhl.com.cn/api/v1/plugins?orderBy=name asc,id desc
```
注意：`asc`是默认值，所以也可以写有`orderBy=name,id desc`

#### 搜索 

我们还可以对容器资源进行特定搜索。
对一个容器资源发送GET请求，带上可查询的参数。

目前我们只支持两种查询方式（后期会增加更多的查询方式）：

*  [Attribute Search](#attribute-search)（一种基于属性的查询）
*  [Datetime Search](#datetime-search) （更特殊的查询）


#####  Attribute Search  

基本上，所有的资源的属性都支持属性查询，格式如下：

```
/api/v1/$CONTAINER_RESOURCE?anAttribute=someValue&anotherAttribute=anotherValue
```

实例：在Plugins中查询一个name叫‘xxxx’的Plugin
```
/api/v1/plugins?name=xxxx
```

**可查询的属性**： 

|资源 | 可查询的属性|
|--|--|
|Application|`name`, `description`, `status`, `createdAt`, `modifiedAt`|
|Account|`name`,`mobile`,`email`,`number` ,`status`, `createdAt`, `modifiedAt`|
（后期进一步完善）

同时属性查询支持模糊查询，以字符 `/*` 表示需要模糊匹配的地方。

例字：查询nmae以‘ABC’开头的插件：
```
/api/v1/plugins?name=ABC*
```


#####  Datetime Search  

日期查询是一种以资源创建时间(`createdAt`)或修改时间(`modifiedAt`)进行过滤查询。
在`PFSP`中，所有资源有的自己的创建时间(`createdAt`)和修改时间(`modifiedAt`)，它是由平台内部进行维护，在对资源的创建修改时，不需要指定时间。


实例：以下是一个账户的创建时间(`createdAt`)和修改时间(`modifiedAt`)属性:

```
{
  "href": "http://pfsp.cyhl.com.cn/api/v1/accounts/:accountUUID",
  "comment":" // This JSON has been truncated for readability",
  "createdAt": "2015-08-25T19:57:05.976Z",
  "modifiedAt": "2015-08-25T19:57:05.976Z",
  "customData": {
    "href": "http://pfsp.cyhl.com.cn/api/v1/accounts/:accountUUID/customData"
  },
  "...":"..."
}
```

日期查询过滤格式如下:  
```[ BEGIN-DATETIME , END-DATETIME ]```  
表示查询从`BEGIN-DATETIME`到`END-DATETIME`的数据资源。  

注意： 

 - `\[ , \]` : 省略前后两个时间，是有效格式，即查询所有数据；
 - `\[ , END-DATETIME\]` : 省略前面第一项日期时间，表示查询该日期之前的数据，包括该日期时间；
 - `\[BEGIN-DATETIME , \]` : 省略后面第二项日期时间，表示查询该日期之后的数据，包括该日期时间；

实例：查询所有创建在2016年1月1日到2016年9月30日之间的所有账户：

```
curl --request GET \
--header 'content-type: application/json' \
--url 'http://pfsp.cyhl.com.cn/api/v1/accounts?createdAt=[2016-01-01, 2016-09-30]'
```

**日期查询边界包含与不包含**  

我们使用`\[ \]`表示包含边界日期，使用`( )`表示不包含边界日期。

实例：查询所有创建在2016年1月1日到2016年6月30日之间，但不包含2016年6月30日的所有账户：

```
curl --request GET \
--header 'content-type: application/json' \
--url 'http://pfsp.cyhl.com.cn/api/v1/accounts?createdAt=[2016-01-01, 2016-06-30）'
```


**日期时间精度**  

查询的精度是由`ISO 8601`指定日期的精度。

例如：你查询以下条件：

 ` ?createdAt=[2016-01-12T12:00:00, 2016-01-12T12:00:05] `  
 
表示此查询将返回在2016年1月12日中午5秒内创建的所有帐户。  

或则，你查询以下条件

` ?createdAt=[2015, 2016] `

表示此查询将返回在2014年1月1号到2014年12月30号,即2014年整年内创建的所有账户。


***
###  超链接   

在`REST`中，一个资源要去引用另一个资源时，则将一个URL超链接作为对象的引用。
我们通常用`href`表示一个资源引用另一个资源对象。

当你需要进一步获取资源时，可以直接对该`href`进行HTTP GET请求等相关操作。

**扩展超链接**  

当你请求资源时，你可能会想`PFSP`服务器返回的不仅只是资源，也是很希望它能返回一个或多个子资源。
链接的扩展是允许你，在一次单一的请求中检索相关资源，而不是要求你发出多个请求。

要展开一个或多个链接，只需增加一个简单`expand`参数即可，属性值以一个或多个分号（` ; `）分隔。
例如：

```
https://api.stormpath.com/v1/plugins/:pluginUUID?expand=widgets;pluginType
```

**扩展参数传递**

如果你想进一步扩展资源链接或是给链接传递查询参数，则可以使用`( )`括号将参数传递进去。
格式如下：
```
?expand=attributeName1(expand:attributeName2(attributeName2 ... );attributeName3)
```

实例：
```
https://api.stormpath.com/v1/plugins/:pluginUUID?expand=widgets(offset:0;limit:20)
```


