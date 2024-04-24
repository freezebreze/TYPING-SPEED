const List = (props) => {
    return <ul>{props.children}</ul>
}

const Li = (props) => {
    return <li>{props.children}</li>
}

List.li = Li

export default List