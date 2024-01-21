import { v4 as uuidV4 } from 'uuid';
import { hash } from "bcryptjs";
import createConnection from '../index';

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO FUNCIONARIOS(id, nome, funcao, is_bloqueado, email, senha, is_admin, created_at)
        values('${id}', 'admin', 'recepcionista', false,'admin@admin.com', '${password}', true, 'now()')`
    )

    await connection.close;
}

create().then(() => console.log('Funcionario admin criado'))
