## Functions

<dl>
<dt><a href="#Notification">Notification(title, options)</a></dt>
<dd><p>A global object that lets you interact with the Notification API.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#callback">callback</a> : <code>function</code></dt>
<dd><p>A callback to be used when the requestPermission method returns a value.</p>
</dd>
</dl>

<a name="Notification"></a>

## Notification(title, options)
A global object that lets you interact with the Notification API.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | of the local notification. |
| options | <code>Options</code> | An object containing optional property/value pairs. |


* [Notification(title, options)](#Notification)
    * [.requestPermission(callback)](#Notification.requestPermission)
    * [.close()](#Notification.close)

<a name="Notification.requestPermission"></a>

### Notification.requestPermission(callback)
requests permission from the user to show a local notification.

**Kind**: static method of [<code>Notification</code>](#Notification)  

| Param | Type | Description |
| --- | --- | --- |
| callback | [<code>callback</code>](#callback) | See type definition. |

<a name="Notification.close"></a>

### Notification.close()
closes an open notification.

**Kind**: static method of [<code>Notification</code>](#Notification)  
<a name="callback"></a>

## callback : <code>function</code>
A callback to be used when the requestPermission method returns a value.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| permission | <code>string</code> | one of "default", "denied" or "granted" |

