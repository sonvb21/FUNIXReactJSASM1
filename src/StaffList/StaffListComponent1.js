import React, { useState } from 'react';
import { Card, CardImg, CardTitle, CardGroup, } from 'reactstrap';
import { Link } from 'react-router-dom'


function RenderMenuItem({ staff }) {
    return (
        <Card >
            <Link to={`/menu/${staff.id}`} >
                <CardImg width="100%" src={staff.image} alt={staff.name} />

            </Link>
        </Card>

    );
}


const List = (props) => {
    const [ListStaff] = useState(props.staffs);
    const [searchStaff, setSearchStaff] = useState("");
    const [ValueStaff, setValueStaff] = useState(searchStaff);

    const SearchStaffs = () => {


        const handleSearch = (event) => {
            setSearchStaff(event.target.value);
        }
        const onSearch = () => {
            setValueStaff(searchStaff);
        }
        return (
            <form onSubmit={(value) => onSearch(value)}>
                <input
                    type="text"
                    value={searchStaff}
                    onChange={(event) => handleSearch(event)}
                />
                <button type="submit">Search</button>
            </form>
        )
    }

    const filteredStaff = ListStaff.filter(staff => {
        return staff.name.toLowerCase().indexOf(ValueStaff.toLowerCase()) !== -1;
    })



    const staffs = filteredStaff.map((staff) => {
        return (
            <CardGroup className="col-6 col-md-4 col-lg-2"  >
                <Card className="m-1" key={staff.id}>
                    <RenderMenuItem staff={staff} />
                    <CardTitle className="t-c" >{staff.name}</CardTitle>

                </Card >
            </CardGroup>
        );
    });

    return (
        <div className="container">
            <div className="row">

                <div className="col-12">
                    <h3>Nhân Viên</h3>
                    <SearchStaffs />
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