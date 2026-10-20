export const cekFormatUsername = (username) => {
    const setRegex = /^[a-zA-Z0-9_-]+$/;

    return setRegex.test(username);
}
