import React, { Component, ErrorInfo, ReactNode } from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { AppDispatch } from "../../store";
import { logoutUser } from "../../store/slices/user";

interface Props {
    children: ReactNode;
    logout: MapDispatchToProps<any, any>;
}


class ErrorBoundary extends Component<Props> {

    public static getDerivedStateFromError(_: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.props.logout();
    }

    public render() {
        return this.props.children;
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        logout: () => dispatch(logoutUser())
    };
};

export default connect(null, mapDispatchToProps)(ErrorBoundary);