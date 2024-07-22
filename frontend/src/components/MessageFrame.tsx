import React, { useEffect, useState } from "react";
import { default as axios } from "axios";
import { Comm, Comment } from "@/components/Comment";

export type Inputs = {
  message: string;
};

export function MessageFrame() {
    const address = window.localStorage.getItem("Address");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/message/read", {
                params: {
                    from_address: "0x" + address,
                },
            })
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {data && data.length > 0 ? (
                data.map((comment: Comm, i: number) => {
                    // @ts-ignore
                    return <Comment key={i} comment={comment} />;
                })
            ) : (
                <div>Нет данных</div>
            )}
        </>
    );
}