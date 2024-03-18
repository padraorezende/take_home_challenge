import { Alert, Snackbar, Typography } from "@mui/material";
import { isNullOrEmpty } from "../../utils/isNullOrEmpty";

export type ShowAlertProps = {
    open: boolean;
    message: string;
    status: "success" | "warning" | "error" | "info";
    onClose?: () => void;
}

export function ShowAlert(props: ShowAlertProps) {
    return (
        <>
            {!isNullOrEmpty(props.message) &&
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={props.open}
                    onClose={() => props.onClose?.()}
                    autoHideDuration={6000}
                >

                    <Alert onClose={props.onClose} variant="filled" severity={props.status}>
                        <Typography style={{ whiteSpace: 'pre-line' }}>
                            {props.message}
                        </Typography>
                    </Alert>
                </Snackbar>}
        </>
    )
}