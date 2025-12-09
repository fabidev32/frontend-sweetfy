import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IOrdersData } from './type';
import DinamicButton from '@/components/Buttons';
import ListOrders from '@/components/ListOfCards/ListOrders';
import {fetchAllOrders} from './../../../api/homePage/getItem'
import { ContainerHomePage, ViewTitle } from './style';


const SeeMoreOrders = () => {
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [orders, setOrders] = useState <IOrdersData[]>([]);

  const router = useRouter();

  const handleNavigateToDetailsOrder = (order: IOrdersData) => {
    const orderDataString = JSON.stringify(order);
    router.push({
      pathname: '/DetailsOrder',
      params: {
        orderData: orderDataString,
      },
    } as any);
  };
  const toggleItemSelection = (itemId: number) => {
    setSelectedItemIds((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };
  const handleSelectPress = () => {
    if (isSelectionModeActive) {
      setSelectedItemIds([]);
    }
    setIsSelectionModeActive((prev) => !prev);
  };
  const handleSelectAllPress = () => {
    const allIds = orders.map((o) => o.id);
    const currentlyAllSelected = selectedItemIds.length === orders.length;

    if (currentlyAllSelected) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(allIds);
    }

    if (!isSelectionModeActive) {
      setIsSelectionModeActive(true);
    }
  };

  useEffect(() => {
  fetchAllOrders(setOrders);
}, []); 
  fetchAllOrders(setOrders)


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ContainerHomePage>
        <Text> Header </Text>

        <View style={{ backgroundColor: '#f1e5ebff' }}>
          <ViewTitle> Encomendas</ViewTitle>

          <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
              <DinamicButton
                type="brownLight"
                onPress={handleSelectPress}
                buttonText="Selecionar"
                buttonStyle={{
                  margin: 10,
                  width: 150,
                  backgroundColor: 'white',
                }}
              />

              <DinamicButton
                type="brownLight"
                onPress={handleSelectAllPress}
                buttonText={
                  selectedItemIds.length === orders.length
                    ? 'Remover'
                    : 'Todos'
                }
                disabled={false}
                buttonStyle={{
                  margin: 10,
                  width: 150,
                  backgroundColor: 'white',
                }}
              />
            </View>

            {isSelectionModeActive ? (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      gap: 10,
                      borderRadius: 18,
                      width: 100,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      source={require('../../../assets/icons/edit.png')}
                      style={{
                        width: 15,
                        height: 15,
                      }}
                    />
                    Editar
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      gap: 10,
                      borderRadius: 18,
                      width: 100,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      source={require('../../../assets/icons/delete.png')}
                      style={{
                        width: 15,
                        height: 15,
                      }}
                    />
                    Excluir
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <ListOrders
            onCardPress={handleNavigateToDetailsOrder}
            data={orders}
            showSelectionControls={isSelectionModeActive}
            selectedItemIds={selectedItemIds}
            onItemSelect={toggleItemSelection}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              margin: 10,
            }}
            cardItemStyle={{
              backgroundColor: '#FFFFFF',
            }}
          />
        </View>
      </ContainerHomePage>
    </ScrollView>
  );
};

export default SeeMoreOrders;
