import { type Driver } from "@/types/driver";
import DriverStatusBadge from "./DriverStatusBadge";

interface Props {
  driver: Driver;
}

export default function DriverRow({
  driver,
}: Props) {
  return (
    <tr className="border-t">
      <td className="p-4">
        <div>
          <p className="font-medium">
            {driver.fullName}
          </p>

          <p className="text-sm text-gray-500">
            {driver.baseCity}
          </p>
        </div>
      </td>

      <td className="p-4">
        {driver.phoneNumber}
      </td>

      <td className="p-4">
        {driver.licenseNumber}
      </td>

      <td className="p-4">
        <DriverStatusBadge status={driver.status} />
      </td>

      <td className="p-4">
        {driver.trips}
      </td>
    </tr>
  );
}