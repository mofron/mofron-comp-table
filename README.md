# mofron-comp-table
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

table component for [mofron](https://mofron.github.io/mofron/).

# Install

```
npm install mofron mofron-comp-table
```

# Sample

```html
<require>
    <tag module="mofron-comp-table">Table</tag>
    <tag module="mofron-comp-text">Text</tag>
</require>

<Table border="1" frame="box" rowHeight="0.5rem">
    <column width="1rem">
        <Text>column1-1</Text>
        <Text>column1-2</Text>
    </column>
    <column width="2rem">
        <Text>column2-1</Text>
        <Text>column2-2</Text>
        <Text>column2-3</Text>
    </column>
    <column width="1.5rem">
        <Text>column3-1</Text>
    </column>
</Table>

<Table rules="rows" rowHeight="0.8rem" width="4rem">
    <row>
        <Text>row1-1</Text>
        <Text>row1-2</Text>
    </row>
    <row>
        <Text>row2-1</Text>
        <Text>row2-2</Text>
        <Text>row2-3</Text>
    </row>
    <row>
        <Text>row3-1</Text>
    </row>
</Table>
```

# Parameter

| Simple<br>Param | Parameter Name     | Type                |    Description                          |
|:---------------:|:-------------------|:--------------------|:----------------------------------------|
|                 | head               | array/component     | head contents                           |
|       ◯         | column             | array               | column contents                         |
|                 | row                | array               | row contents                            |
|                 | border             | string              | border width                            |
|                 | frame              | string              | frame value                             |
|                 | rules              | string              | rule value                              |
|                 | column_width       | array               | column width                            |
|                 | width              | strung (size)/array | table width/column width                |
|                 | rowHeight          | string (size)       | row height                              |

