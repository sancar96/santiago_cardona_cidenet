<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class Employee extends Controller
{

    public function listEmployees(){
        try{
            $employees = User::where("status","Activo")->get();
            return response()->json(["status" => 200, "employees" => $employees]);
        }catch(Exception $e){
            return response()->json(["status" => 500, "message" => $e]);
        }

    }
    
    public function saveEmployee(Request $request){
        try{

            $newUser = new User();
            $newUser->first_name = $request->first_name;
            $newUser->other_name = ($request->other_name == "") ? " " : $request->other_name;
            $newUser->first_ape = $request->first_ape;
            $newUser->second_ape = $request->second_ape;
            $newUser->email = $request->email;
            $newUser->password = md5("123456789");
            $newUser->employ_country = $request->employ_country;
            $newUser->ide_type = $request->ide_type;
            $newUser->ide_num = $request->ide_num;
            $newUser->login_date = $request->login_date;
            $newUser->area = $request->area;
            $newUser->status = $request->status;
            $newUser->register_date = $request->register_date;
            $newUser->edit_date = $request->register_date;
            $newUser->save();

            return response()->json(["status" => 200, "message" => "Empleado guardado."]);
        }catch(exception $e){
            return response()->json(["status" => 500, "message" => $e]);
        }
    }

    public function validateEmailExist(Request $request){
        $usersByEmail = User::where("email", 'like', "%".$request->newEmail."%")->select("email")->get();
        $countEmails = 0;
        foreach($usersByEmail as $user){
            if(strpos($user->email, $request->domain)){
                $countEmails ++;
            }
        }        

        if($countEmails > 0){
            $response = ["increment" => $countEmails];
        }else{
            $response = ["increment" => false];
        }
        
        return response()->json($response);
    }

    public function deleteEmployee(Request $request){
        try{
            $user = User::find($request->id);
            $user->status = "Inactivo";
            $user->save();
            $name = "Empleado ".$user->first_name." ".$user->first_ape." eliminado.";
            return response()->json(["status" => 200, "message" => $name]);
        }catch(exception $e){
            return response()->json(["status" => 500, "message" => $e]);
        }
    }

    public function filterEmployees(Request $request){
        try{
            $query = User::whereNotNull("password");
            if($request->first_name){
                $query->where("first_name",$request->first_name);
            }
            if($request->other_name){
                $query->where("other_name",$request->other_name);
            }
            if($request->first_ape){
                $query->where("first_ape",$request->first_ape);
            }
            if($request->second_ape){
                $query->where("second_ape",$request->second_ape);
            }
            if($request->email){
                $query->where("email",$request->email);
            }
            if($request->ide_type){
                $query->where("ide_type",$request->ide_type);
            }
            if($request->ide_num){
                $query->where("ide_num",$request->ide_num);
            }
            if($request->employ_country){
                $query->where("employ_country",$request->employ_country);
            }
            if($request->status){
                $query->where("status",$request->status);
            }
            $employees = $query->get();
            return response()->json(["status" => 200, "employees" => $employees]);
        }catch(exception $e){
            return response()->json(["status" => 500, "message" => $e]);
        }
    }

    public function getDataEditEmployee($id){
        try{
            $dataEditEmployee = User::find($id);
            return view('editar_empleados')->with("dataEditEmployee", $dataEditEmployee);
            // return response()->json(["status" => 200, "message" => ""]);
        }catch(exception $e){
            return response()->json(["status" => 500, "message" => $e]);
        }
    }

    public function editEmployee(Request $request){
        try{
            $user = User::find($request->id);
            $user->first_name = $request->first_name;
            $user->other_name = ($request->other_name == "") ? " " : $request->other_name;
            $user->first_ape = $request->first_ape;
            $user->second_ape = $request->second_ape;
            $user->email = $request->email;
            $user->employ_country = $request->employ_country;
            $user->ide_type = $request->ide_type;
            $user->ide_num = $request->ide_num;
            $user->login_date = $request->login_date;
            $user->area = $request->area;
            $user->status = $request->status;
            $user->edit_date = $request->edit_date;
            $user->save();

            return response()->json(["status" => 200, "message" => "Empleado Actualizado."]);
        }catch(exception $e){
            return response()->json(["status" => 500, "message" => $e]);
        }
    }

}
