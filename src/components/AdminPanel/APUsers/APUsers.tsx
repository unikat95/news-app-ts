import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../../../context/NewsContext";
import { IoMdSettings } from "react-icons/io";
import APUsersItem from "../APUsersItem/APUsersItem";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

export default function APUsers() {
  const { usersList } = useContext(NewsContext) || {};
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center bg-white p-5 gap-5 md:p-10 md:gap-10 overflow-auto">
      <h1 className="w-full h-auto text-2xl text-slate-700 font-medium">
        Users
      </h1>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div className="w-full grid grid-cols-[4fr,1fr,auto] md:grid-cols-[2fr,1fr,1fr,1fr,auto] lg:grid-cols-[2fr,1fr,1fr,1fr,1fr,auto] xl:grid-cols-[3fr,2fr,2fr,2fr,2fr,4fr,auto] items-center justify-items-start relative gap-2 px-2 py-4 md:py-3 lg:py-2 rounded-md">
          <div className="flex text-[.70rem] font-black text-slate-500 uppercase">
            Email
          </div>
          <div className="flex text-[.70rem] font-black text-slate-500 uppercase">
            Photo
          </div>
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
            First name
          </div>
          <div className="hidden md:flex text-[.70rem] font-black text-slate-500 uppercase">
            Last name
          </div>
          <div className="hidden lg:flex text-[.70rem] font-black text-slate-500 uppercase">
            Birth Date
          </div>
          <div className="hidden xl:flex text-[.70rem] font-black text-slate-500 uppercase">
            Rank
          </div>
          <div className="px-2 bg-white w-[2em] h-[2em] rounded-full flex justify-center items-center">
            <IoMdSettings size="20" className="text-slate-700" />
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center gap-2 mt-5">
            <LoadingSpinner /> loading user list...
          </div>
        ) : (
          <>
            {usersList?.map((user) => (
              <APUsersItem user={user} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
