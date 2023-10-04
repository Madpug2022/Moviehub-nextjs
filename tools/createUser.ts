const createUser = async (url: string, data: any) => {

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;

    } catch (error) {
        console.log("There was a problem with the fetch operation:", error);
    }
};

export default createUser
