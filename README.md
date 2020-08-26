# mofron-comp-table
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

table component for mofron


# Install
```
npm install mofron mofron-comp-table
```

# Sample
```html
<setting>
    <tag module="mofron-comp-table">Table</tag>
    <tag module="mofron-comp-text">Text</tag>
</setting>

<Table border=1 frame=box rowHeight=0.5rem>
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

<Table rules=rows rowHeight=0.8rem width=4rem>
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

| Short<br>Form | Parameter Name | Type | Description |
|:-------------:|:---------------|:-----|:------------|
| | beforeRender | ||| ◯  | head | array | head contents list [mofron.class.Component,..] |
| | | | undefined: call as getter |
| | column | mixed | mofron.class.Component: column contents  |
| | | | array: column contents list [mofron.class.Component,..] |
| | | | undefined: call as getter |
| | row | mixed | mofron.class.Component: column contents  |
| | | | array: column contents list [mofron.class.Component,..] |
| | | | undefined: call as getter |
| | insertType | string | insert type ("column","row") |
| | | | undefined: call as getter |
| | insert | array | table contents list [mofron.class.Component,..] |
| | | number | insert index |
| | | | undefined: insert at the end |
| | delete | number | delete index |
| | count | ||| | border | string(size) | border width |
| | | | undefined: call as getter |
| | frame | string | frame type ["void", "above", "below", "hsides", "vsides", "lhs", "rhs", "box", "border"] |
| | rules | string | rule value ["none", "groups", "rows", "cols", "all"] |
| | | | undefined: call as getter |
| | width | string (size) | table size/column size |
| | columnWidth | string(size) | column width |
| | height | string(size) | height size |
| | rowHeight | string(size) | row height |

