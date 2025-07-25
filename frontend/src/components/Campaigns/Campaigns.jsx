import CampaingItem from "./CampaingItem"
import "./Campaigns.css"

const Campaigns = () => {
  return (
    <section className="campaigns">
    <div className="container">
      <div className="campaigns-wrapper">
        <CampaingItem/>
        <CampaingItem/>
        
      </div>
      <div className="campaigns-wrapper">
        <CampaingItem/>
        <CampaingItem/>
        
      </div>
    </div>
  </section>

  )
}

export default Campaigns