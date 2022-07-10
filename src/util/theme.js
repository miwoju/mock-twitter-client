export default {
    palette: {
        primary: {
            main: "#1DA1F2",
            contrastText: "#fff",
        },
        secondary: {
            main: "#f6a5c0",
            contrastText: "#fff",
        },
    },
    typography: {
        useNextVariants: true,
    },
    spreadThis: {
        postImage: {
            width: 200,
            objectFit: "cover",
        },
        card: {
            display: "flex",
            marginBottom: 20,
        },
        content: {
            position: "relative",
            width: "100%",
        },
        page: {
            margin: "0 auto",
            textAlign: "center",
            width: "33%",
        },
        image: {
            margin: "20px auto 10px auto",
            minWidth: "100",
            height: "100",
        },
        pageTitle: {
            margin: "10px auto 20px auto",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        textField: {
            margin: "10px auto 10px auto",
        },
        customError: {
            marginTop: "10px",
        },
        button: {
            margin: "20px auto 20px auto",
            position: "relative",
        },
        closeButton: {
            position: "absolute",
            left: "91%",
        },
        progress: {
            position: "absolute",
        },
        invisibleSeparator: {
            border: "none",
            margin: 4,
        },
        visibleSeparator: {
            borderBottom: "1px solid grey",
            width: "100%",
            marginBottom: 20,
        },
        //From Profile.jsx
        paper: {
            padding: 10,
            textAlign: "center",
        },
        profile: {
            padding: 20,
            "& .image-wrapper": {
                margin: "0 auto",
                width: "70%",
            },
            "& .profile-image": {
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: "50%",
                margin: "0 auto 10 auto",
            },
            "& hr": {
                margin: "10 0 10 0",
                border: "none",
            },
            "& .profile-details": {
                marginBottom: 40,
                "& a": {
                    color: "#1DA1F2",
                },
                "& span, svg": {
                    verticalAlign: "middle",
                },
            },
            "& .edit-button": {},
        },
        customLoginText: {
            margin: "10",
            fontSize: 16,
        },
        logoutText: {
            marginTop: "55",
            textAlign: "left",
            "&:hover": {
                cursor: "pointer",
            },
        },
    },
};
