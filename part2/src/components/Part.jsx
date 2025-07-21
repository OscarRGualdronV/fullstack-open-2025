const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} <strong>{exercises}</strong>
        </p>
    );
};

export default Part;