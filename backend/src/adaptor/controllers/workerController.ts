import { Request, Response } from "express";
import { WorkerRepository } from "../../application/repository/workerDbRepository";
import { WorkerRepositoryMongoDB } from "../../framework/database/repository/workerDbRepository";

const workerController = (
    workerDbRepository: WorkerRepository,
    workerDbRepositoryImp: WorkerRepositoryMongoDB,
) => {
    const dbWorkerRepository = workerDbRepository(workerDbRepositoryImp());

    
}