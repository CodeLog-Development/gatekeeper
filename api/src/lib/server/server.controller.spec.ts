import { ServerController } from './server.controller';
import {
  StartInstanceRequest,
  StartServerResponse,
  StopServerResponse,
} from './server.interface';
import { ServerService, ServerStatus } from './server.service';
import { Test } from '@nestjs/testing';

describe('ServerController', () => {
  let serverController: ServerController;
  let serverService: ServerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ServerController],
      providers: [ServerService],
    }).compile();

    serverService = moduleRef.get<ServerService>(ServerService);
    serverController = new ServerController(serverService);
  });

  describe('getStatus', () => {
    it('should return the server status', async () => {
      const result: ServerStatus = {
        success: true,
        message: 'Lorem ipsum',
        running: [],
      };

      jest
        .spyOn(serverService, 'getServerStatus')
        .mockImplementation(async () => {
          return result;
        });

      expect(await serverController.getStatus()).toBe(result);
    });
  });

  describe('startServer', () => {
    it('should start the server', async () => {
      const result: StartServerResponse = {
        success: true,
        message: 'Lorem ipsum',
        started: ['1234'],
      };

      jest
        .spyOn(serverService, 'startInstance')
        .mockImplementation(async (id: string) => {
          return {
            success: true,
            message: 'Lorem ipsum',
            started: [id],
          };
        });

      expect(
        await serverController.startServer({ instanceId: '1234' }),
      ).toStrictEqual(result);
    });
  });

  describe('stopServer', () => {
    it('should stop the server', async () => {
      const result: StopServerResponse = {
        success: true,
        message: 'Lorem ipsum',
        stopped: ['1234'],
      };

      jest.spyOn(serverService, 'stopServer').mockImplementation(async () => {
        return result;
      });

      expect(
        await serverController.stopServer({ instanceId: '1234' }),
      ).toStrictEqual(result);
    });
  });
});
