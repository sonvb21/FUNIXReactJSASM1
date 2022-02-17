import React,{useState} from 'react';
import { Card, CardImg, CardTitle, CardGroup,  } from 'reactstrap';
import { Link } from 'react-router-dom'


// const SearchStaffs =(props) =>{
//     const {SearchStaff, setSearchStaff} = useState("")
// console.log(SearchStaff)
//     const handleSearch =(event) =>{
//         setSearchStaff(event.target.value)
//         console.log(event.target.value)
//     }
//     return (
//         <form>
//             <input
//             type="text"
//             value ={SearchStaff}
//             onChange={(event)=>handleSearch(event)}
//             >
            
//             </input>
//             <putton> Search </putton>
//         </form>
//     )
// }


function RenderMenuItem({  staff }) {
    return (
        <Card >
            <Link to={`/menu/${ staff.id}`} >
                <CardImg width="100%" src={ staff.image} alt={ staff.name} />

            </Link>
        </Card>

    );
}


const List = (props) => {
    const staffs = props.staffs.map((staff) => {
        return (
            <CardGroup className="col-6 col-md-4 col-lg-2"  >
                <Card className="m-1" key={ staff.id}>
                    <RenderMenuItem  staff={ staff} />
                    <CardTitle className= "t-c" >{ staff.name}</CardTitle>
                    
                </Card >
            </CardGroup>
        );
    });

    return (
        <div className="container">
            <div className="row">

                <div className="col-12">
                    <h3>Nhân Viên</h3>
                    {/* <SearchStaffs /> */}
                    <hr />
                    
                </div>
            </div>
            <div className="row">
                {staffs}
            </div>
        </div>
    );

}

export default List;