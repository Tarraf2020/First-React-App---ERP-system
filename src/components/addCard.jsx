import { Link } from "react-router-dom";
import "./employee_card/style.css";





function Card_add(props) {
  return (
    <>
      <div className="card_add" >
      
        <Link className="link" to={`${props.route}`} style={{color:'#ff821e',fontWeight:'bold'}} >
        <i class="fa fa-plus-circle fa-3x"></i>
          <p>{props.title}</p>
        </Link>
        
      </div>
    </>
  );
}

export default Card_add;
