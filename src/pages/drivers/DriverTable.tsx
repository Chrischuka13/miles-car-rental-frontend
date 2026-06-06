interface Driver {
  _id: string;

  fullName: string;

  email: string;

  phoneNumber: string;

  licenseNumber: string;

  languages: string[];

  baseCity: string;

  status: string;

  isVerified: boolean;

  rating: number;

  trips: number;
}

interface Props {
  data: Driver[];
}

export default function DriverTable({
  data,
}: Props) {

  if (!data.length) {
    return (
      <div className="rounded-2xl border p-10 text-center">
        No drivers found
      </div>
    );
  }
   import.meta.env.DEV && console.log(data);
  

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm bg-white">
        <thead className="">
          <tr className="bg-[#F8F4F0] border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wide">
            <th className="p-4 w-10">
              <input type="checkbox" className="rounded" />
            </th>

            <th className="px-4 py-3 text-left uppercase ">
              Driver
            </th>

            <th className="px-4 py-3 text-left uppercase">
              Phone
            </th>

            <th className="px-4 py-3 text-left uppercase">
              License
            </th>

            <th className="px-4 py-3 text-left uppercase">
              Languages
            </th>

            <th className="px-4 py-3 text-left uppercase">
              Rates
            </th>

            <th className="px-4 py-3 text-left uppercase">
              Trips
            </th>            

            <th className="px-4 py-3 text-left uppercase">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((driver) => (
            <tr
              key={driver._id}
              className="border-t"
            >
              <th className="p-4 w-10">
                <input type="checkbox" className="rounded" />
              </th>
              <td className="px-4 py-4">
                <div>
                  <p className="font-semibold">
                    {driver.fullName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {driver.email}
                  </p>
                </div>
              </td>

              <td className="px-4 py-4">
                {driver.phoneNumber}
              </td>

              <td className="px-4 py-4">
                {driver.licenseNumber}
              </td>

              <td className="flex items-center py-4 ">
                <div className="flex bg-[#E9E9E9] rounded-[16px] px-4 py-2">
                  {driver?.languages?.join(', ')} 
                </div>
              
              </td>

              <td className="px-4 py-4">
                ⭐ {driver.rating}
              </td>

              <td className="px-4 py-4">
                {driver.trips}
              </td>

              <td className="px-4 py-4">
                <span className="rounded-full bg-blue-100 px-3 py-2 text-sm text-blue-600">
                  {driver.status}
                </span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}