import { AdminService } from "../service/admin.service";

export class AdminController {

  constructor(
    private readonly adminService: AdminService 
  ) {}
}