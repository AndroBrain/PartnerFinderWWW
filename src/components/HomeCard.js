export function HomeCard(props) {
    return <div className={"home-card "}>
        <img className={"home-card-img"} src={props.image}/>
        <div className={props.className}>
            {props.children}
        </div>
    </div>
}