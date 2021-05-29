export const handleNetworkError = (error, historyAction) => {
    if (error.response === undefined) {
        alert("Network error");
        localStorage.clear();
        // historyAction();
    }
    else {
        alert(error.response.status + " przeladuj strone");
        localStorage.clear();
        // historyAction();
    }
}