const getdataById = async () => {
        try {
            const response = await axios.get(
                `https://6560930983aba11d99d11c99.mockapi.io/wislamapp/booking/${dataId}`,
            );
            setSelectedData({
                id: response.data.id,
                id_destination: response.data.id_destination,
                person: {
                    name: response.data.person.name,
                    id_number: response.data.person.id_number,
                    telp: response.data.person.telp
                },
                date: response.data.date,
            });
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };