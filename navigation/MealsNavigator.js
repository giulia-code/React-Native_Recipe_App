import React from 'react';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { 
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer,
  createDrawerNavigator
 } from 'react-navigation';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen',
}

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
    MealDetail: MealDetailScreen 
  }, {
    defaultNavigationOptions: defaultStackNavOptions
  });

const FavNavigator = createStackNavigator({
  Favorite: FavoritesScreen,
  MealDetail: MealDetailScreen,
}, {
  defaultNavigationOptions: defaultStackNavOptions
});

const tabsScreenConfig = {
  Meals: { 
    screen: MealsNavigator, 
    navigationOptions: { 
      tabBarIcon: (tabInfo) => {
        return <Ionicons 
                name='ios-restaurant' 
                size={25} 
                color={tabInfo.tintColor} />
      },
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans'}}>Meals</Text> : 'Meals'
    }},
  Favorite: { screen: FavNavigator, navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons 
                name='ios-star' 
                size={25} 
                color={tabInfo.tintColor} />
      },
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans'}}>Favorites</Text> : 'Favorites'
  }}
}

const MealsFavTabNavigator = 
  Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(tabsScreenConfig, {
      activeColor: Colors.accentColor,
      shifting: true, 
    })
    :  createBottomTabNavigator(tabsScreenConfig, {
          tabBarOptions: { 
            labelStyle: {
              fontFamily: 'open-sans-bold'
            },
          activeTintColor: Colors.accentColor
          }
        }
      );

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, {
  navigationOptions: {
    drawerlabel: 'Filters!!!!'
  },
  defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
  MealsFavs: { 
    screen: MealsFavTabNavigator, 
    navigationOptions: { 
      drawerlabel: 'Meals' 
    }
  },
  Filters: FiltersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});

export default createAppContainer(MainNavigator);
