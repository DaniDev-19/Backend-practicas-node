const findTallerByCod = async (db, codt) => {
    const { rows } = await db.query('SELECT * FROM taller WHERE codt = $1', [codt]);
    return rows[0];
};

const createTallerDB = async (db, { codt, nombre, ciudad }) => {
    const { rows } = await db.query(
        'INSERT INTO taller (codt, nombre, ciudad) VALUES ($1, $2, $3) RETURNING *',
        [codt, nombre, ciudad]
    );
    return rows[0];
};

module.exports = { findTallerByCod, createTallerDB };