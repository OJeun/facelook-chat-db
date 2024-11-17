import express from 'express';
import * as DB from './db';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import chatRouter from './routes/chat';
import friendRouter from './routes/friend';
import groupRouter from './routes/group';
import invitationRouter from './routes/invitation';
import userRouter from './routes/user';

dotenv.config();

const runServer = async () => {
    const app = express();
    const sequelize = DB.init();
    
    app.set('port', process.env.PORT || 3000);
    app.use(express.json());
    app.use(cors());

    app.use('/api/auth', authRouter);
    app.use('/api/chat', chatRouter);
    app.use('/api/friend', friendRouter);
    app.use('/api/group', groupRouter);
    app.use('/api/invitation', invitationRouter);
    app.use('/api/user', userRouter);

    app.listen(app.get('port'), () => {
        console.log(`Server is running on port ${app.get('port')}`);
    }
    );
};

runServer();

