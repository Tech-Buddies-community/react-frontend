import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavList from "./NavList";
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import customAPI from "../api";
import { logoutUser } from "../features/userSlice";

const Nav = () => {
    const user = useSelector((state) => state.userState.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlingLogout = async () => {
        try {
            await customAPI.post('/auth/logout');
            dispatch(logoutUser());
            navigate('/');
        } catch (error) {
            dispatch(logoutUser());
            navigate('/');
        }
    }

    return (
        <nav className="bg-base-100">
            <div className="navbar mx-auto max-w-6xl px-8">
                <div className="navbar-start">
                    <NavLink to={'/'} className='hidden lg:flex text-3xl items-center'>
                        <img src="/techbuddies.png" width='50px' />
                    </NavLink>
                    {/* Mobile Device */}
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <FaBarsStaggered className="h-6 w-6" />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                            <NavList /> 
                        </ul>
                    </div>

                    {/* Dekstop Device */}
                    <div  className="hidden lg:flex">
                        <ul className="menu menu-horizontal text-black">
                            <NavList />
                        </ul>
                    </div>
                </div>
                <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    {/* <div tabIndex={0} role="button" className="flex items-center gap-2 btn btn-ghost">
                            <div className="avatar w-10 h-10 rounded-full overflow-hidden bg-white">
                                {profile?.photo_profile ? (
                                    <img
                                        src={profile.photo_profile}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaUser className="w-full h-full text-black m-1" />
                                )}
                            </div>
                            <span className="text-white font-medium hidden lg:flex">
                                {profile ? `${(profile.first_name + " " + profile.last_name).slice(0, 12)}${(profile.first_name + " " + profile.last_name).length > 12 ? "..." : ""}` : "Loading..."}
                            </span>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <NavLink to='/profile'>Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to='/transaction'>Transaction History</NavLink>
                            </li>
                        { user && (
                            <li><a onClick={handlingLogout}>Logout</a></li>
                        )}
                    </ul> */}
                    {user && (
                        <button className="btn btn-error btn-outline btn-sm m-2" onClick={handlingLogout}>
                            Logout
                        </button>
                    )}
                </div>
                </div>
            </div>
        </nav>
    )
}


export default Nav;