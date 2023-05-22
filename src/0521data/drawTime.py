# coding:utf-8 
import json
import codecs
import matplotlib.pyplot as plt
import numpy as np

x_axis_data = []
  # x
y_axis_nTE = [6062,15231,16918,5961,13890,3252,7581,6354,6893,4786,6144,10601,6359,8417,8878,6793,9407,5531,9578,7555,8751,4566,10746,11348,5340,11144,15293,3775,6353,21987,6392,3602,6782,5799,3767,10097,7469,13210,22871,6134,7225,3770,8851,7480,6162,16372,21139,6131,4633,6788]  # y
y_axis_up = [10,8,5,12,10,9,10,12,13,6,12,10,14,38,10,20,8,10,7,14,27,10,8,7,6,7,12,7,7,10,8,10,12,7,5,11,11,16,8,10,10,6,11,10,7,9,13,8,13,17]

y_axis_nTS = [9018,4402,3648,3517,3400,19959,3561,3916,3687,3505,3910,3693,3968,4089,3767,3936,3845,3882,3929,3689,3840,3871,3917,3957,3939,3915,3936,3925,3755,3922,4413,3492,3757,3925,3882,4003,3711,3658,3810,3591,3835,3734,3991,3901,4016,3965,3797,3648,3768,3503]

y_axis_nTE.sort()
y_axis_up.sort()
y_axis_nTS.sort()

st = 0
for x in y_axis_nTE:
        st += float(x)  # s为输入数字的总和
avgt = st/50
print('avgt = ',avgt)

su = 0
for x in y_axis_up:
        su += float(x)  # s为输入数字的总和
avgu = su/50
print('avgu = ',avgu)

ss = 0
for x in y_axis_nTS:
        ss += float(x)  # s为输入数字的总和
avgs = ss/50
print('avgs = ',avgs)
print('diffuS = ', float(y_axis_up[25])/float(y_axis_nTS[25]))
print('diffuE = ', float(y_axis_up[25])/float(y_axis_nTE[25]))

label = 'update_Time','navigateToStart_Time','navigateToEnd_Time'

plt.boxplot([ y_axis_up,y_axis_nTS,y_axis_nTE], labels=label,patch_artist=True, vert=False, boxprops={'color': 'lightblue'},sym='r.')
plt.grid(linestyle = "--", alpha = 0.3)
plt.ylabel('Time (ms)')

# Q2_up = y_axis_up[25]
# plt.text(Q2_up,label[2], f'$mid$ = {np.round(Q2_up, 3)}', verticalalignment='center')

plt.show()
