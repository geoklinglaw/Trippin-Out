from ortools.constraint_solver import pywrapcp
# from ortools.constraint_solver import routing
from ortools.constraint_solver import routing_enums_pb2
import sys
import json

    

# def create_data_model(output):
#     """Converts the result from Google Distance Matrix API to data model for TSP."""
#     data = {}
#     rows = output["rows"]
    
#     time_matrix = []
#     for row in rows:
#         row_distances = []
#         for element in row["elements"]:
#             if element["status"] == "OK":
#                 row_distances.append(element["duration"]["value"])
#             else:
#                 row_distances.append(1e9)
#         time_matrix.append(row_distances)

#     num_days = 3
#     max_time_per_day = 10 * 3600 
    
#     # Assign distance_matrix to data
#     data['time_matrix'] = time_matrix
    
#     # Assign num_vehicles and depot (assuming 1 vehicle and depot is 0)
#     data['num_vehicles'] = 0
#     data['depot'] = 0
    
#     return data

# def print_solution(manager, routing, solution):
#     """Prints solution on console."""
#     print('Objective: {} seconds taken'.format(solution.ObjectiveValue()))
#     index = routing.Start(0)
#     plan_output = 'Route for vehicle 0:\n'
#     route_distance = 0
#     while not routing.IsEnd(index):
#         plan_output += ' {} ->'.format(manager.IndexToNode(index))
#         previous_index = index
#         index = solution.Value(routing.NextVar(index))
#         route_distance += routing.GetArcCostForVehicle(previous_index, index, 0)
#     plan_output += ' {}\n'.format(manager.IndexToNode(index))
#     print(plan_output)
#     plan_output += 'Route distance: {}miles\n'.format(route_distance)


# def main(output):
#     """Entry point of the program."""
#     # Instantiate the data problem.
#     data = create_data_model(output)

#     # Create the routing index manager.
#     manager = pywrapcp.RoutingIndexManager(len(data['time_matrix']),
#                                            data['num_vehicles'], data['depot'])

#     # Create Routing Model.
#     routing = pywrapcp.RoutingModel(manager)


#     def distance_callback(from_index, to_index):
#         """Returns the distance between the two nodes."""
#         # Convert from routing variable Index to distance matrix NodeIndex.
#         from_node = manager.IndexToNode(from_index)
#         to_node = manager.IndexToNode(to_index)
#         return data['time_matrix'][from_node][to_node]

#     transit_callback_index = routing.RegisterTransitCallback(distance_callback)

#     # Define cost of each arc.
#     routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

#     # Setting first solution heuristic.
#     search_parameters = pywrapcp.DefaultRoutingSearchParameters()
#     search_parameters.first_solution_strategy = (
#         routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)

#     # Solve the problem.
#     solution = routing.SolveWithParameters(search_parameters)

#     # Print solution on console.
#     if solution:
#         print_solution(manager, routing, solution)


# if __name__ == '__main__':

#     with open('timeMatrix/distance_matrix_results_20230627T104314646Z.json') as json_file:
#         data = json_file.read()
#         json_data = json.loads(data)

#     main(json_data)



   

# def create_data_model(output, info):
#     """Converts the result from Google Distance Matrix API to data model for TSP."""
#     data = {}
#     rows = output["rows"]
    
#     time_matrix = []
#     for row in rows:
#         row_distances = []
#         for element in row["elements"]:
#             if element["status"] == "OK":
#                 row_distances.append(element["duration"]["value"])
#             else:
#                 row_distances.append(1e9)
#         time_matrix.append(row_distances)

#     num_days = 3

#     service_times = []
#     for location in info:
#         # Retrieve the activity_duration for the current location
#         activity_duration = location.get("activity_duration", 0)  # Using .get() method to avoid KeyError if activity_duration doesn't exist
        
#         # Append the activity_duration to the service_times list
#         service_times.append(activity_duration)

#     # Output the service_times list
#     print(service_times)

    
#     # Assign distance_matrix to data
#     data['time_matrix'] = time_matrix
#     data['service_times'] = service_times
    
#     # Assign num_vehicles and depot (assuming 1 vehicle and depot is 0)
#     data['num_vehicles'] = num_days
#     data['depot'] = 0

#     print(data)
#     return data

# def print_solution(data, manager, routing, solution):
#     """Prints solution on console."""
#     print(f'Objective: {solution.ObjectiveValue()}')
#     time_dimension = routing.GetDimensionOrDie('Time')
#     total_time = 0
#     for vehicle_id in range(data['num_vehicles']):
#         index = routing.Start(vehicle_id)
#         plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
#         while not routing.IsEnd(index):
#             time_var = time_dimension.CumulVar(index)
#             plan_output += '{0} Time({1},{2}) -> '.format(
#                 manager.IndexToNode(index), solution.Min(time_var),
#                 solution.Max(time_var))
#             index = solution.Value(routing.NextVar(index))
#         time_var = time_dimension.CumulVar(index)
#         plan_output += '{0} Time({1},{2})\n'.format(manager.IndexToNode(index),
#                                                     solution.Min(time_var),
#                                                     solution.Max(time_var))
#         plan_output += 'Time of the route: {}min\n'.format(
#             solution.Min(time_var))
#         print(plan_output)
#         total_time += solution.Min(time_var)
#     print('Total time of all routes: {}min'.format(total_time))


# def main(output, info):
#     """Solve the VRP with time windows."""
#     # Instantiate the data problem.
#     data = create_data_model(output, info)

#     # Create the routing index manager.
#     manager = pywrapcp.RoutingIndexManager(len(data['time_matrix']),
#                                            data['num_vehicles'], data['depot'])

#     # Create Routing Model.
#     routing = pywrapcp.RoutingModel(manager)


#     # Create and register a transit callback.
#     def time_callback(from_index, to_index):
#         """Returns the travel time between the two nodes plus service time at the initial node."""
#         from_node = manager.IndexToNode(from_index)
#         to_node = manager.IndexToNode(to_index)
#         service_time = data['service_times'][from_node]
#         return data['time_matrix'][from_node][to_node] + service_time

#     transit_callback_index = routing.RegisterTransitCallback(time_callback)

#     # Define cost of each arc.
#     routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

#     # Add Time Windows constraint.
#     time = 'Time'
#     routing.AddDimension(
#         transit_callback_index,
#         720,  # allow waiting time
#         720,  # maximum time per vehicle
#         False,  # Don't force start cumul to zero.
#         time)
    
#     time_dimension = routing.GetDimensionOrDie(time)
    
#     # Add service time at each location
#     for location_idx, service_time in enumerate(data['service_times']):
#         index = manager.NodeToIndex(location_idx)
#         time_dimension.SetCumulVarSoftUpperBound(index, service_time, 100)

#     horizon = (9 * 60, 21 * 60)
#     for location_idx in range(len(data['time_matrix'])):
#         index = manager.NodeToIndex(location_idx)
#         time_dimension.CumulVar(index).SetRange(horizon[0], horizon[1])


#     # Instantiate route start and end times to produce feasible times.
#     for i in range(data['num_vehicles']):
#         routing.AddVariableMinimizedByFinalizer(
#             time_dimension.CumulVar(routing.Start(i)))
#         routing.AddVariableMinimizedByFinalizer(
#             time_dimension.CumulVar(routing.End(i)))

#     # Setting first solution heuristic.
#     search_parameters = pywrapcp.DefaultRoutingSearchParameters()
#     search_parameters.first_solution_strategy = (
#         routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)

#     # Solve the problem.
#     solution = routing.SolveWithParameters(search_parameters)

#     # Print solution on console.
#     if solution:
#         print_solution(data, manager, routing, solution)


# if __name__ == '__main__':
#     # with open('timeMatrix/distance_matrix_results_20230627T104314646Z.json') as json_file:
#     #     data = json_file.read()
#     #     json_data = json.loads(data)
#     with open('location_list_20230627T131746308Z.json') as f:
#         info = json.load(f)

#     with open('timeMatrix/distance_matrix_results_20230627T104314646Z.json') as json_file:
#         data = json_file.read()
#         json_data = json.loads(data)

#     results = main(json_data, info)
#     print(results)

########## HAVE NOT IMPLEMENTED DURATION TIME YET ##########

def create_data_model(output, info):
    """Converts the result from Google Distance Matrix API to data model for TSP."""
    data = {}
    rows = output["rows"]
    
    time_matrix = []
    for row in rows:
        row_distances = []
        for element in row["elements"]:
            if element["status"] == "OK":
                row_distances.append(element["duration"]["value"])
            elif element["status"] == "ZERO_RESULTS":
                row_distances.append(0)
            else:
                row_distances.append(10000000000)
        time_matrix.append(row_distances)

    num_days = 3
    data['time_matrix'] = time_matrix
    data['num_vehicles'] = num_days
    data['depot'] = 0
    # print(data)
    return data

def print_solution(data, manager, routing, solution):
    """Prints solution on console."""
    print(f'Objective: {int(solution.ObjectiveValue() / 60)}')
    max_route_time = 0
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
        route_time = 0
        while not routing.IsEnd(index):
            plan_output += ' {} -> '.format(manager.IndexToNode(index))
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_time += routing.GetArcCostForVehicle(previous_index, index, vehicle_id)
        plan_output += '{}\n'.format(manager.IndexToNode(index))
        plan_output += 'Time of the route: {} minutes\n'.format(int(route_time / 60))
        print(plan_output)
        max_route_time = max(route_time, max_route_time) / 60
    print('Maximum of the route times: {} minutes'.format(int(max_route_time)))

def get_solution(data, manager, routing, solution):
    """Returns solution as a list of dictionaries."""
    vrp_output = []
    max_route_time = 0
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        route = []
        route_time = 0
        while not routing.IsEnd(index):
            route.append(manager.IndexToNode(index))
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_time += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id
            )
        route.append(manager.IndexToNode(index))
        vrp_output.append({
            "vehicle": vehicle_id,
            "route": route,
            "time": int(route_time / 60)
        })
        max_route_time = max(route_time, max_route_time) / 60
    return vrp_output

def main(output, info):
    """Entry point of the program."""
    # Instantiate the data problem.
    data = create_data_model(output, info)

    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(len(data['time_matrix']),
                                           data['num_vehicles'], data['depot'])

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)


    # Create and register a transit callback.
    def distance_callback(from_index, to_index):
        """Returns the distance between the two nodes."""
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['time_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Add Distance constraint.
    dimension_name = 'Distance'
    routing.AddDimension(
        transit_callback_index,
        0,  # no slack
        18000,  # vehicle maximum travel distance
        True,  # start cumul to zero
        dimension_name)
    distance_dimension = routing.GetDimensionOrDie(dimension_name)
    distance_dimension.SetGlobalSpanCostCoefficient(100)

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)

    # Print solution on console.
    if solution:
        print_solution(data, manager, routing, solution)
        return get_solution(data, manager, routing, solution)
    else:
        print('No solution found !')

def get_location_info(vrp_list, accoms):
    with open('location_list_20230627T205236778Z.json', 'r') as file:
        location_data = json.load(file)

    sorted_routes = {"results": []}

    for vrp in vrp_list:
        vehicle = vrp["vehicle"]
        route_indices = vrp["route"]
        time = vrp["time"]

        sorted_route = {"vehicle": vehicle, "route": [], "time": time, "attraction": []}
        # sorted_route["attraction"].append({
        #     "name": "Home",
        #     "location": f"{accoms}"
        # })
        
        for index in route_indices:
            if index < len(location_data):
                sorted_route["attraction"].append({
                    "name": location_data[index]["name"],
                    "location": location_data[index]["location"]
                })

        sorted_routes["results"].append(sorted_route)
        with open('sorted_routes.json', 'w') as file:
            json.dump(sorted_routes, file, indent=4)

    return sorted_routes



if __name__ == '__main__':

    with open('location_list_20230627T205236778Z.json') as f:
        info = json.load(f)
    
    accoms = '1.2841401999747222, 103.86086997077395'
    with open('timeMatrix/distance_matrix_results1_20230627T214453014Z.json') as json_file:
        data = json_file.read()
        json_data = json.loads(data)


    results = main(json_data, info)
    print(results)
    sorted = get_location_info(results, accoms)
    print(sorted)
