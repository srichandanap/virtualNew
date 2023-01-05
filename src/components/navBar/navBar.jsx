import React, { useState, useEffect } from 'react'
import "./navBar.css"
import navLogo from "../../asstes/images/Group 118.png"
import bell from "../../asstes/images/Bell.png"
import setting from "../../asstes/images/Gear.png"
import search from "../../asstes/images/MagnifyingGlass.png"
import axios from "axios";

const NavBar = () => {
    const [profile, setProfile] = useState()

    useEffect(() => {
        axios
          .get(
            `https://app-virtuallearning-221207091853.azurewebsites.net/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
              },
            }
          )
          .then((res) => {
            // console.log(res);
            setProfile(res?.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }, []);

    return (
        <div>
            <div className='nav'>
                <div className='navMargin'>
                    <img src={navLogo} alt="img" className="navImage" />
                    <form>
                        <div className="searchImage">
                            {/* <button className='searchs'> */}
                            <img src={search} alt="img" className='searchs' />
                            {/* </button> */}

                            <input
                                // autoComplete="off"
                                type="text"
                                className="searchBar"
                                placeholder="Search"
                                id="search"
                                name="search"
                            />
                        </div>
                    </form>
                    <div className='navRight'>
                        <img src={bell} alt="img" className='bell' />
                        <img src={setting} alt="img" className='settings' />
                        <img src={profile?.profilePic} alt="img" className='profile' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar