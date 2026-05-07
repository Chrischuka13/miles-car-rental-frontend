export const fetchCarTypes = async () => {
    const res = await fetch("/api/cars");
    if (!res.ok) {
      throw new Error("Failed to fetch cars");
    }
    return res.json();
    };