interface ErrorPageProps {
    message: string
}

export default function ErrorPage({ message }: ErrorPageProps) {
    return (
        <div
            style={{
                width: "100%",
                height: "100svh",
                display: "grid",
                placeItems: "center",
                textAlign: "center"
            }}
        >
            <h2>{message}</h2>
        </div>
    )
}