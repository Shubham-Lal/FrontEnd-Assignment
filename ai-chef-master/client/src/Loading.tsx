export default function LoadingPage() {
    return (
        <div
            style={{
                width: "100%",
                height: "100svh",
                display: "grid",
                placeItems: "center"
            }}
        >
            <img
                width={150}
                height={150}
                src="/loading.gif"
            />
        </div>
    )
}