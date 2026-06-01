import {type Driver } from "@/types/driver"

export const getDriverStats = (
  drivers: Driver[]
) => {
  return {
    total: drivers.length,

    available: drivers.filter(
      (d) => d.status === "available"
    ).length,

    onTrip: drivers.filter(
      (d) => d.status === "on-trip"
    ).length,

    offDuty: drivers.filter(
      (d) => d.status === "off-duty"
    ).length,

    inactive: drivers.filter(
      (d) => d.status === "inactive"
    ).length,

    avgRating:
      drivers.length > 0
        ? (
            drivers.reduce(
              (acc, curr) =>
                acc + curr.rating,
              0
            ) / drivers.length
          ).toFixed(2)
        : "0.00",
  };
};