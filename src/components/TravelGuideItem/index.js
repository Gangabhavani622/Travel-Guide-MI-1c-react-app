import './index.css'

const TravelGuideItem = props => {
  const {travelItem} = props
  const {name, imageUrl, description} = travelItem

  return (
    <li className="list-container">
      <img src={imageUrl} alt={name} className="image" />
      <h1 className="name">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}

export default TravelGuideItem
