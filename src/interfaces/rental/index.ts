import { LogisticsInterface } from 'interfaces/logistics';
import { UserInterface } from 'interfaces/user';
import { ToolInterface } from 'interfaces/tool';
import { GetQueryInterface } from 'interfaces';

export interface RentalInterface {
  id?: string;
  start_date: any;
  end_date: any;
  total_cost: number;
  user_id: string;
  tool_id: string;
  created_at?: any;
  updated_at?: any;
  logistics?: LogisticsInterface[];
  user?: UserInterface;
  tool?: ToolInterface;
  _count?: {
    logistics?: number;
  };
}

export interface RentalGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  tool_id?: string;
}
