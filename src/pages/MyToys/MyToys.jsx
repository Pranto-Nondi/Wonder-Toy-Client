import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import swal from 'sweetalert';
import { AuthContext } from '../../povider/AuthProvider';
import MyToysList from './MyToysLIst';


const MyToys = () => {
    const [loader, setLoader] = useState(false)
    const { user } = useContext(AuthContext)
    const [myToys, setMyToys] = useState([])
    const [control, setControl] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:5000/myToys/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {

                    setMyToys(data);
                    setLoader(false);
                } else {

                    // logout and then navigate
                    navigate('/');
                }
            });
    }, [user, navigate])
    const handleDelete = (id) => {
        swal({
            title: "Are you sure You want to delete?",
            text: "Once deleted,This Toy is  Deleted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                fetch(`http://localhost:5000/deleteToy/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data?.deletedCount > 0) {
                            const remain = myToys?.filter(singleMyToy => singleMyToy._id !== id)
                            setMyToys(remain)
                            setLoader(false)
                            swal("Good Job! Your toy has been deleted!", {
                                icon: "success",
                            });
                        }
                    })
            } else {
                swal("Toy is not deleted");
            }
        });
    }



    if (loader) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    }

    return (

        <div className='container  mx-auto'>
            <h1 className="text-2xl text-center font-bold  mb-4 ">My Toys</h1>
            <div className="max-w-full overflow-hidden ">
                <table className="table w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2">No</th>
                            <th className="py-2">Image</th>
                            <th className="py-2">Name</th>
                            <th className="py-2">Seller Name</th>
                            <th className="py-2">Seller Email</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Rating</th>
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">Edit</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myToys?.map((toy, index) => (
                            <MyToysList key={toy._id} toy={toy} index={index} handleDelete={handleDelete} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>





    );
};

export default MyToys;