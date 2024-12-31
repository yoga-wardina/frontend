export const InputHandler = (e, setState) => {
    const name = e.target.name;
    setState((prevState) => ({
        ...prevState,
        [name]: e.target.value,
    }));
};
