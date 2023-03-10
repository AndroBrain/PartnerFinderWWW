export function ProfileCardShort({className, imageSrc, name, bio}) {
    return <div className={"flex-row profile-card-short " + className}>
        <img className="profile-card-short-img" src={imageSrc}/>
        <div className="flex-column profile-card-short-info">
            <span className="headline-large profile-card-short-name">{name}</span>
            <div className="profile-card-short-line"/>
            <span className="body-medium">{bio}</span>
        </div>
    </div>
}